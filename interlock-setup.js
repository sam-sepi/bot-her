//DB init
var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-setup.db', autoload: true });

//Obj. init
var creation = {};

//### Propert. ### //

creation.id = 'Interlock';

creation.characterization = ['name', 'class', 'img'];    

//Classes
creation.classes = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

//Skills
creation.specialSkills = ['Leadership', 'Combattimento', 'Interfaccia', 'Cybertecnologia', 'Credibilità', 'Autorità', 'Risorse', 'Contatti', 'Famiglia'];

//Stats
creation.stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];

//skills
creation.skills = [
    'Accademiche', 'Scienze', 'Percepire', 'Pedinare', 'Seminare', 'Rete', 'Finanza', 'Programmare', 'Sopravvivenza', 'Comporre',
    'Intimidire', 'Volontà', 'Interrogare', 'Sprawl',
    'Intervistare', 'Mondanità', 'Intuire', 'Persuadere', 'Raggirare', 'Sedurre',
    'Borseggiare', 'Esplosivi', 'Falsificare', 'Riparare', 'Scassinare', 'Soverglianza', 'Suonare', 'Elettronica', 'Guarire', 'Diagnosi',
    'Mischia', 'Pistole', 'Fucili', 'Mitra', 'Rissa', 'Danza', 'Furtività', 'Guidare', 'Pilotare', 'Schivare',
    'Forza', 'Nuotare', 'Resistenza', 'Atletica',
    'Stile', 'Trucco'
];

//Max and min value
creation.min = 1;
creation.max = 10;


//Help 
creation.help = `Hey Choomba, benvenuto su Bot-her, un bot che permette di giocare su discord. Il sistema scelto è l'Interlock, il celebre motore di Cyberpunk 2020. Stai creando il tuo cazzuto cyberpunk e voglio darti qualche dritta per farlo velocemente. I comandi sono *!character name* seguito dal nome che vuoi dare al tuo personaggio, *!character class* seguito dalla classe selezionata tra quelle previste: *${creation.classes.toString()}*. Ogni classe ha un'abilità speciale che verrà aggiunta al set di quelle selezionabili, rispettivamente: *${creation.specialSkills.toString()}*. Infine, devi dare un valore alle statistiche e alle abilità da un minimo di 1 ad un massimo di 10. Le statistiche sono *${creation.stats.toString()}* e le abilità base *${creation.skills.toString()}*. Il comando per impostare le caratteristiche è *!character seguito dalla statistica o dall'abilità scelta e dal grado*. Quelle non selezionate saranno considerate a 0. Buon gioco, Choomba!`;

//Db insert
db.insert(creation, function (err, newDoc)
{   
    console.log(err);
});

profession = {};

//Professions
profession.id = 'Professions';

profession.rocker = ['Leadership', 'Suonare', 'Sprawl', 'Percepire', 'Stile', 'Comporre', 'Raggirare', 'Sedurre'];
profession.solitario = ['Mischia', 'Atletica', 'Percepire', 'Fucili', 'Furtività', 'Rissa', 'Forza', 'Pistole'];
profession.netrunner = ['Interfaccia', 'Programmare', 'Rete', 'Accademiche', 'Scienze', 'Elettronica', 'Percepire', 'Furtività'];
profession.tecnico = ['Riparare', 'Cybertecnologia', 'Scienze', 'Elettronica', 'Guarire', 'Intuire', 'Diagnosi', 'Percepire'];
profession.reporter = ['Sprawl', 'Intervistare', 'Mondanità', 'Credibilità', 'Intuire', 'Percepire', 'Raggirare', 'Comporre'];
profession.poliziotto = ['Autorità', 'Mischia', 'Sprawl', 'Interrogare', 'Rissa', 'Intuire', 'Pistole', 'Atletica'];
profession.corporativo = ['Risorse', 'Trucco', 'Percepire', 'Intuire', 'Persuadere', 'Raggirare', 'Finanza', 'Stile'];
profession.ricettatore = ['Contatti', 'Mischia', 'Falsificare', 'Intimidire', 'Rissa', 'Raggirare', 'Persuadere', 'Scassinare'];
profession.nomade = ['Famiglia', 'Guidare', 'Atletica', 'Percepire', 'Fucili', 'Resistenza', 'Riparare', 'Mischia'];

//Db insert
db.insert(profession, function (err, newDoc)
{   
    console.log(err);
});
