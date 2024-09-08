require("dotenv").config();
const mongoose = require("mongoose");

const { Aluno, DisciplinaInc, DisciplinaRef } = require("../src/index");

const aluno1 = new Aluno({
  nome: "Maria",
  matricula: "12001",
});
const aluno2 = new Aluno({
  nome: "Paulo",
  matricula: "12002",
});
const aluno3 = new Aluno({
  nome: "Andre",
  matricula: "12003",
});

beforeAll(async () => {
  await mongoose.connect(process.env.URLMONGOOSE);
  // await aluno1.save();
  // await aluno2.save();
  // await aluno3.save();
});

test("Deve usar relacionamento incorporado", async () => {
  const disciplina = new DisciplinaInc({
    nome: "Quimica",
    codigo: "QUI01",
  });
  disciplina.alunosMatriculados.push(aluno1);
  disciplina.alunosMatriculados.push(aluno2);
  disciplina.alunosMatriculados.push(aluno3);
  await disciplina.save();
  console.log(disciplina);
  expect(disciplina).toBeInstanceOf(Object);
});

test("Deve usar relacionamento por referência", async () => {
  const disciplina = new DisciplinaRef({
    nome: "Matematica",
    codigo: "MAT01",
  });
  disciplina.alunosMatriculados.push(aluno1._id);
  disciplina.alunosMatriculados.push(aluno2._id);
  disciplina.alunosMatriculados.push(aluno3._id);
  await disciplina.save();
  console.log(disciplina);
  expect(disciplina).toBeInstanceOf(Object);
});

test("Deve fazer uma consulta usando o pipeline de agregação", async () => {
  // Listar os nomes dos alunos matriculados em uma disciplina
  const dados = await DisciplinaRef.aggregate([
    { $unwind: "$alunosMatriculados" },
    {
      $lookup: {
        from: "alunos",
        localField: "alunosMatriculados",
        foreignField: "_id",
        as: "aluno",
      },
    },
    { $unwind: "$aluno" },
    { $project: { _id: 0, nome: 1, codigo: 1, nomeAluno: "$aluno.nome" } },
    { $group: { _id: "$codigo", alunos: { $push: "$nomeAluno" } } },
  ]);
  console.log(dados);
  expect(dados).toBeInstanceOf(Object);
});

test("Deve fazer uma consulta usando agregação", async () => {
  // Listar os nomes dos alunos matriculados em uma disciplina
  const dados = await DisciplinaRef.aggregate()
  .unwind("$alunosMatriculados")
  .lookup({from:"alunos", localField:"alunosMatriculados", foreignField:"_id", as:"aluno"})
  .unwind("$aluno")
  .project({_id:0, nome:1, codigo:1, nomeAluno:"$aluno.nome"})
  .group({_id:"$codigo", alunos:{$push:"$nomeAluno"}})
    // [
    // {$unwind:"$alunosMatriculados"},
    // {$lookup:{from:"alunos", localField:"alunosMatriculados", foreignField:"_id", as:"aluno"}},
    // {$unwind:"$aluno"},
    // {$project:{_id:0, nome:1, codigo:1, nomeAluno:"$aluno.nome"}},
    // {$group:{_id:"$codigo", alunos:{$push:"$nomeAluno"}}}
  // ]);
  console.log(dados);
  expect(dados).toBeInstanceOf(Object);
});


test("Deve fazer uma consulta com populate", async () => {
  // Listar os nomes dos alunos matriculados em uma disciplina
  const dados = await DisciplinaRef.findOne().populate("alunosMatriculados")

  console.log(dados);
  expect(dados).toBeInstanceOf(Object);
});

afterAll(async () => {
  await mongoose.disconnect();
});
