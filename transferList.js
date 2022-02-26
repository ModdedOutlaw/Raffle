  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=modded.gm&schema_name=miners&page=1&limit=100&order=desc&sort=created";
  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');


  outputRaffleEntries.innerHTML = "";


  fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {

    let list = data.data;
    console.log(list);

    

   /* var sortedlist = [];
    var sortedarray = [];
    var newlist = new Array();

    for (let i = 0; i < list.length; i++) {

      sortedlist.push([list[i].sender_name, Object.keys(list[i].assets).length]);
    }
    sortedarray = sortedlist.slice().sort();

   
    let i = 0;
    let k = 0;
    let length = sortedarray.length;

    console.log(sortedarray);

    while (i < length) {
      if (i === 0) {
        newlist.push(sortedarray[i]);
        k++;
        i++;
      } else {
        if (sortedarray[i][0] === newlist[k - 1][0]) {
          newlist[k - 1][1] += sortedarray[i][1];
          i++;
        } else {
          newlist.push(sortedarray[i]);
          i++;
          k++;
        }
      }
    }

  let tt = 0;*/
    
  for(let i = 0; i < list.length; i++){
       outputRaffleEntries.innerHTML += '<br><b>' + (i+1) + '. </b>' + list[i].sender_name + '<br>';
    }
    console.log(newlist);

    //outputTransfers.innerHTML += '<br><b>'+tt+'</b><br>';

    

  }).catch(function (error) {
    console.log(error);

  })