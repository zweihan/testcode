const express = require('express');
const app = express();
const papa = require("Papaparse");
const fs = require("fs");

app.get('/', function(req, res){
    var csvContent = fs.readFileSync("FILENAME");

    var parsedCSV = papa.parse(csvContent).data;

    var persons = {};
    var personCount = 0;

    var projects = {};

    for(row in parseCSV){
        var person = row[4];
        //maps every unique ID to a unique number;
        if (persons.person === undefined){
            persons[person] = personCount;
            personCount++;
        }

        //group users who visited each project;
        var projectId = row[3]; //need to parse further

        if(projects.projectId === undefined){
            projects[projectId] = {persons: {}, id: projectId};
        }
        projects[projectId].persons[person] = 1;

    }

    var collabMatrix = [personCount+1][personCount+1];
    for (project in projects){
        for(personA in project.persons){
            for(personB in project.persons){
                if (personA !== personB){
                    collabMatrix[persons[personA]][persons[personB]] +=1;
                    collabMatrix[persons[personB]][persons[personA]] +=1;
                }
            }
        }
    }


});


app.listen(3000, function(){

});