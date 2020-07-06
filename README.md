# Bot-Her

###### Un bot per discord per giocare a Cyberpunk 2020

## Get started

Bot-her è un bot scritto grazie alle API offerte da [Discord.js](https://discord.js.org/#/) per [Node](https://nodejs.org/it/) ed al database non relazionale [NeDb](https://github.com/louischatriot/nedb/).

## Usage

Una volta entrato nel server che ospita il bot, l'utente riceverà un direct message che lo inviterà a muoversi entro un canale per procedere alla creazione del proprio personaggio di fantasia.

Il comando *!charname* seguito dal nome del proprio personaggio creerà una nuova voce nella tabella interlock-users.db che associerà il suddetto personaggio all'ID utente di discord.

Il comando *!role* seguito dalla classe scelta, darà un ruolo al personaggio in gioco. La scelta potrà essere compiuta tra le seguenti classi: *rocker, solitario, netrunner, tecnico, reporter, poliziotto, corporativo, ricettatore, nomade*.

Quindi il comando *!stat* permetterà di dare un punteggio alle varie caratteristiche (intelligenza, freddezza, empatia, tecnologia, riflessi, costituzione, fascino). La somma di tutte queste caratteristiche deve essere 45 e ogni caratteristica singola dovrà essere posta entro un range compreso tra 2 e 10.

Il comando *!skill* permette, entro la somma di 40 punti, di dare un punteggio alle abilità professionali, mentre *!freeskill* a quelle non professionali, entro il limite di 12 punti.

Con *!end* si procede poi alla verifica e alla finalizzazione del personaggio.

Infine, in gioco con il comando *!roll* seguito dalla caratteristica e/o dall'abilità si potrà simulare il tiro del dado.

Buon gioco, choomba!

### Authors

Sam Sepi - sam.sepi.84@gmail.com

### License

This project is licensed under the **MIT** License - see the LICENSE.md file for details