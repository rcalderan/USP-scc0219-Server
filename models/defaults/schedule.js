const scheduleDefaultDocument = [//todos horarios marcados
  
    { _id: 0, owner: 0, animal:0,service:0, price:60, description: "nothing", date: new Date() },
    { _id: 1, owner: 7, animal:2,service:"Consulta", price:160,description: "Vet Pipoca", date: new Date(2019, 11, 9, 12, 0, 0, 0) },
    { _id: 2, owner: 7, animal:2, service:"Grooming", price:120,description: "Grooming Pipoca", date: new Date(2019, 11, 9, 12, 30, 0, 0) },
    { _id: 3, owner: 7, animal:2, service:"Grooming", price:120,description: "take Pipoca", date: new Date(2019, 11, 2, 19, 20, 0, 0) }
  ]
module.exports = scheduleDefaultDocument