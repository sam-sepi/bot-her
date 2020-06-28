//DB init
var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-list.db', autoload: true });

list = {};

list.game = 'Interlock'
//Classes
list.classes = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

//Skills
list.specialSkills = ['Leadership', 'Combattimento', 'Interfaccia', 'Cybertecnologia', 'Credibilità', 'Autorità', 'Risorse', 'Contatti', 'Famiglia'];

//Stats
list.stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];

//skills
list.skills = [
    'Accademiche', 'Scienze', 'Percepire', 'Pedinare', 'Seminare', 'Rete', 'Finanza', 'Programmare', 'Sopravvivenza', 'Comporre',
    'Intimidire', 'Volontà', 'Interrogare', 'Sprawl',
    'Intervistare', 'Mondanità', 'Intuire', 'Persuadere', 'Raggirare', 'Sedurre',
    'Borseggiare', 'Esplosivi', 'Falsificare', 'Riparare', 'Scassinare', 'Soverglianza', 'Suonare', 'Elettronica', 'Guarire', 'Diagnosi',
    'Mischia', 'Pistole', 'Fucili', 'Mitra', 'Rissa', 'Danza', 'Furtività', 'Guidare', 'Pilotare', 'Schivare',
    'Forza', 'Nuotare', 'Resistenza', 'Atletica',
    'Stile', 'Trucco'
];

//Max and min value
list.minvalue = 1;
list.maxvalue = 10;

characterization = {};

//characterizations
characterization.id = 'Interlock';

characterization.rocker = ['Leadership', 'Suonare', 'Sprawl', 'Percepire', 'Stile', 'Comporre', 'Raggirare', 'Sedurre'];
characterization.solitario = ['Mischia', 'Atletica', 'Percepire', 'Fucili', 'Furtività', 'Rissa', 'Forza', 'Pistole'];
characterization.netrunner = ['Interfaccia', 'Programmare', 'Rete', 'Accademiche', 'Scienze', 'Elettronica', 'Percepire', 'Furtività'];
characterization.tecnico = ['Riparare', 'Cybertecnologia', 'Scienze', 'Elettronica', 'Guarire', 'Intuire', 'Diagnosi', 'Percepire'];
characterization.reporter = ['Sprawl', 'Intervistare', 'Mondanità', 'Credibilità', 'Intuire', 'Percepire', 'Raggirare', 'Comporre'];
characterization.poliziotto = ['Autorità', 'Mischia', 'Sprawl', 'Interrogare', 'Rissa', 'Intuire', 'Pistole', 'Atletica'];
characterization.corporativo = ['Risorse', 'Trucco', 'Percepire', 'Intuire', 'Persuadere', 'Raggirare', 'Finanza', 'Stile'];
characterization.ricettatore = ['Contatti', 'Mischia', 'Falsificare', 'Intimidire', 'Rissa', 'Raggirare', 'Persuadere', 'Scassinare'];
characterization.nomade = ['Famiglia', 'Guidare', 'Atletica', 'Percepire', 'Fucili', 'Resistenza', 'Riparare', 'Mischia'];

//Db insert list
db.insert(list, function (err, newDoc)
{   
    console.log(err);
});

//Db insert characterization
db.insert(characterization, function (err, newDoc)
{   
    console.log(err);
});
