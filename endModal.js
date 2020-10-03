// const endModal = document.querySelector('.endModal');
// const winnersList = document.querySelector('.table__body');
// // const winners = document.querySelector
// const renderTable = doc => {
//   const nick = document.createElement('td');
//   const result = document.createElement('td');
//   const tr = document.createElement('tr');

//   tr.setAttribute('data-id', doc.id);
//   nick.textContent = doc.data().nick;
//   result.textContent = doc.data().result;

//   tr.appendChild(nick);
//   tr.appendChild(result);
//   winnersList.appendChild(tr);

//   console.log(doc.data());
// };

// if (lifes.innerText < 1) {
//   db.collection('winnersInGame')
//     .get()
//     .then(snapshot => {
//       snapshot.docs.forEach(doc => {
//         renderTable(doc);
//       });
//     });
// }
