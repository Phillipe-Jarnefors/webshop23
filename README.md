# Marsvinsbutiken



## Vad är Marsvinsbutiken?

Marsvinsbutiken är ett skolprojekt som har utvecklats av Emma, Jakob, Jesper, Olga, Phillipe och Sargon. Det är en hemsida som ska föreställa en verklighetsbaserad butikssida, där man kan lägga produkter i en varukorg för att sedan slutföra köpet. Det finns även en admin sida där ägaren kan välja att redigera existerande produkter, ta bort existerande produkter, lägga till nya produkter och att man även kan se placerade ordrar i systemet.
Appen fungerar liknande som ett CMS system kan man säga.



## Hur byggdes projektet?

Projektet byggdes med hjälp av React som frontend ramverk och Express samt MongoDB som backend ramverk. Hela arbetet blev noggrant planerat innan vi i gruppen satte igång med att bygga grunderna för projektet. När det kommer till design så har vi använt oss av Mui’s komponent bibliotek.

Vi använde oss av Figma för att skissa upp de viktiga men även nödvändiga verktygen för att handskas med framtida problem som kunde uppstå. Dessa problem var tex vilka dependencies kommer vi att behöva ha för vår front- och backend? Hur vill vi att våra objekt ska se ut för front- och backend? Hur kommer vår trädstruktur att se ut för projektet?
Allt av det ovannämnda var bara några av de fundamentala sakerna vi skulle komma att behöva veta under projektets gång.
Genom att ha skissat upp detta tidigt i projektet så hamnade vi alla direkt på samma sida och hade samma vision för hur projektet skulle struktureras upp samt utföras.

Gruppen bestämde sig för att sätta upp backendens databas först av allt eftersom det var där vi skulle lagra all data. Det behövdes även data för att vi skulle kunna hämta ut det i vår frontend, vilket var ett plus i kanten när vi startade i den änden. Gruppen la mycket tid på att se till så alla endpointsen fungerade korrekt och att vi hade schemes för ordrar och produkter.

När gruppen sedan kände att backenden var väl uppsatt så började vi med frontenden. Vi delade upp våra Github issues till alla i gruppen så att alla hade något att göra, vi kodade ensamt ibland men även två och två eller i större grupper för att underlätta de svårare problemen som uppkom. 
Vi skapade mappar för våra olika komponenter såsom: Components, Admin, Cart, Products och Utilities. Detta blev en väldigt enkel process med tanke på att vi skissade upp allt i vår trädstruktur på Figma. 

För frontenden så använde vi oss även av interfaces vilket vi la i en separat fil i Utilities mappen. Dessa interfaces var tex Product, EditedProduct, AddProduct, Orders och CartProduct bara för att nämna några stycken.
 Alla våra interfaces användes flitigt genom hela appen och vi fick göra flertalet stycken för de olika områdena där det behövde tillämpas.

Vi använder Loaders som fetchar all vår data åt oss i respektive komponent och ser till att allting är hämtat innan vi renderar ut någonting på sidan. Loaders är ett bra verktyg för att se till så att allt renderas ut samtidigt istället för att vissa saker renderas ut i olika takter.



## Hur körs appen?

När man har hämtat ner projektet på sin egen dator så är det essentiellt att man går in på både front- och backend-mappen en i taget för att köra kommandot “npm i”. Detta är ett måste för att man ska få hem de viktiga dependencies som används i appen.

Så fort allting är installerat så kan man gå in i sin VScode, öppna upp två terminaler och gå in på respektive map per terminal för att köra kommandona “npm run dev” i frontend-mappen och “nodemon start” för backend-mappen.
Detta ska resultera i att du får upp en localhost länk i din frontend terminal och ett meddelande i din backend terminal där det står “Ansluten till databasen”.

Appen körs med hjälp av vår databas MongoDB som vi lagrar all data på. Så varje gång du skapar en order i appen så lagras din order i databasen. Detsamma gäller även ifall du skulle lägga till produkter från admin sidan.
När man tar bort produkter eller ordrar så soft-deletas det bara, det vill säga att det finns kvar i databasen men inte längre synligt i appen. 
Det går naturligtvis bra att ansluta till MongoDB databasen och ändra tillbaks ett värde ifall man gjort fel genom att ändra isDeleted värdet för Order respektive Product.

## Snabbinstallation:

Frontend
```js
cd Frontend
npm install
npm run dev
```

Backend
```js
cd Backend
npm install
nodemon start
```


## Länkar:

[React](https://react.dev/) <br>
[MongoDB](https://www.mongodb.com/) <br>
[ExpressJS](https://expressjs.com/) <br>
[Mui](https://mui.com/) <br>
[Figma](https://www.figma.com/file/XdNV4pMRKx6a4DqVJTIpSe/Untitled?type=design&node-id=0-1&mode=design&t=4JX3xXK8Zh4V2Bzu-0) <br>
