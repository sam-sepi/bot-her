
module.exports = 
{
    name: 'interlock',
    description: 'Character creation',
    execute(message, args)
    {
        property = {};
        //Classes
        property.classes = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

        //Skills
        property.specialSkills = ['Leadership', 'Combattimento', 'Interfaccia', 'Cybertecnologia', 'Credibilità', 'Autorità', 'Risorse', 'Contatti', 'Famiglia'];

        //Stats
        property.stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];

        //skills
        property.skills = [
            'Accademiche', 'Scienze', 'Percepire', 'Pedinare', 'Seminare', 'Rete', 'Finanza', 'Programmare', 'Sopravvivenza', 'Comporre',
            'Intimidire', 'Volontà', 'Interrogare', 'Sprawl',
            'Intervistare', 'Mondanità', 'Intuire', 'Persuadere', 'Raggirare', 'Sedurre',
            'Borseggiare', 'Esplosivi', 'Falsificare', 'Riparare', 'Scassinare', 'Soverglianza', 'Suonare', 'Elettronica', 'Guarire', 'Diagnosi',
            'Mischia', 'Pistole', 'Fucili', 'Mitra', 'Rissa', 'Danza', 'Furtività', 'Guidare', 'Pilotare', 'Schivare',
            'Forza', 'Nuotare', 'Resistenza', 'Atletica',
            'Stile', 'Trucco'
        ];

        //Max and min value
        property.min = 1;
        property.max = 10;

        characterization = {};

        //characterizations
        characterization.id = 'characterizations';

        characterization.rocker = ['Leadership', 'Suonare', 'Sprawl', 'Percepire', 'Stile', 'Comporre', 'Raggirare', 'Sedurre'];
        characterization.solitario = ['Mischia', 'Atletica', 'Percepire', 'Fucili', 'Furtività', 'Rissa', 'Forza', 'Pistole'];
        characterization.netrunner = ['Interfaccia', 'Programmare', 'Rete', 'Accademiche', 'Scienze', 'Elettronica', 'Percepire', 'Furtività'];
        characterization.tecnico = ['Riparare', 'Cybertecnologia', 'Scienze', 'Elettronica', 'Guarire', 'Intuire', 'Diagnosi', 'Percepire'];
        characterization.reporter = ['Sprawl', 'Intervistare', 'Mondanità', 'Credibilità', 'Intuire', 'Percepire', 'Raggirare', 'Comporre'];
        characterization.poliziotto = ['Autorità', 'Mischia', 'Sprawl', 'Interrogare', 'Rissa', 'Intuire', 'Pistole', 'Atletica'];
        characterization.corporativo = ['Risorse', 'Trucco', 'Percepire', 'Intuire', 'Persuadere', 'Raggirare', 'Finanza', 'Stile'];
        characterization.ricettatore = ['Contatti', 'Mischia', 'Falsificare', 'Intimidire', 'Rissa', 'Raggirare', 'Persuadere', 'Scassinare'];
        characterization.nomade = ['Famiglia', 'Guidare', 'Atletica', 'Percepire', 'Fucili', 'Resistenza', 'Riparare', 'Mischia'];
        
        help = {};
        help.error = 'Errore nel comando digitato';

        help.duplicate = 'Esiste giù un personaggio associato all\'ID utente';
        help.len = 'Invia un nome, inferiore a venti caratteri. Esempio: *!Interlock name Joe*';
        help.name = 'Inserisci il nome del tuo personaggio, utilizzando il comando *!Interlock name* seguito dal nome scelto. Esempio: *!Interlock name Joe*';
        help.init = `Benvenuto Choomba. Bot-Her è un bot che permette di giocare via chat su Discord. Il sistema selezionato è l'Interlock. ${help.name}`;
        help.class = `Inserisci la classe del tuo personaggio scegliendola tra le seguenti: *${property.classes.toString()}*. Il comando è *!Interlock* seguito dalla classe. Esempio: !Interlock Netrunner`;
        help.stats = `Ora seleziona le abilità dalla lista ${property.stats.toString()}. Devi spendere 40 punti e per registrare i tuoi gradi dovrai inviare questo comando: *!Interlock* seguito dalla skill e un numero compreso tra 1 e 10. Es.: !Interlock Riflessi 4`;
            
        character = {};
        //DB init
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });
            
        if(args[0] == 'init')
        {
            message.channel.send(help.init);
        }

        if(args[0] == 'name')
        {
            db.findOne({userid: message.author.id}, (err, user) => 
            {       
                if(user != null) 
                {
                    message.author.send(help.duplicate);
                    return;
                }
            });

            if(!args[1] || args[1].length > 20) 
            {
                message.author.send(help.len);
                return;
            }
            
            character.name = args[1];
            character.userid = message.author.id;

            db.insert(character, (err, newdoc) => 
            {
                console.log(err);
            });
        }
    }
}