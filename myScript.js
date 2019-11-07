function fetchData(){
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(obj => {
        document.querySelector("#myTable tbody").remove();
        let newTBody = document.createElement("tbody");
        let myTable = document.querySelector("#myTable");
        for(let i=0 ; i<obj.length;i++)
        {
            let newRow = document.createElement("tr");
            let theId = document.createElement("td");
            theId.innerText = obj[i].id;
            let userId = document.createElement("td");
            userId.innerText = obj[i].userId;
            let title = document.createElement("td");
            title.innerText = obj[i].title;
            let body = document.createElement("td");
            body.innerText = obj[i].body;
            newRow.appendChild(theId);
            newRow.appendChild(userId);
            newRow.appendChild(title);
            newRow.appendChild(body);
            newTBody.appendChild(newRow);
        }
        myTable.appendChild(newTBody);
        
    })
    .catch(error => {
        document.querySelector("#status").innerText= "There was an error!\n "+error;
        document.querySelector("#status").style.color="red";
    } );
}

function getData(){
    fetchData();
    document.querySelector("#status").innerText="";
}

function refresh(){
    getData();
    document.querySelector("#status").innerText= "Data is up to date";
    document.querySelector("#status").style.color="green";
}

function addData(){
    let newTitle = document.querySelector("#title").value;
    let newBody = document.querySelector("#body").value;
    let newUserId = document.querySelector("#userId").value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: newTitle,
      body: newBody,
      userId: newUserId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => {
    document.querySelector("#status").innerText= "You've added a new post : \nTitle:\n "+ json.title +" \nbody:\n "+json.body+"\nUser Id:\n "+json.userId;
    document.querySelector("#status").style.color="green";  
})
.catch(error => {
    document.querySelector("#status").innerText= "There was an error!\n "+error;
    document.querySelector("#status").style.color="red";
} );
}

function updateData(){
    let newId =document.querySelector("#theId2").value;
    fetch('https://jsonplaceholder.typicode.com/posts/'+newId, {
    method: 'PUT',
    body: JSON.stringify({
    title: newTitle,
    body: newBody,
    userId: newUserId
    }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(response => response.json())
    .then(json => {
    document.querySelector("#status").innerText= "You've updated the post with id :"+json.id +"\nTitle:\n "+ json.title +" \nbody:\n "+json.body+"\nUser Id:\n "+json.userId;
    document.querySelector("#status").style.color="green";  
    })
    .catch(error => {
    document.querySelector("#status").innerText= "There was an error!\n "+error;
    document.querySelector("#status").style.color="red";
    } );

}

function delData(){
    let newId =document.querySelector("#theId").value;
    fetch('https://jsonplaceholder.typicode.com/posts/'+newId, {
        method: 'DELETE'
    })
    .then(()=>{
        document.querySelector("#status").innerText= "You've deleted a post with id :"+newId;
        document.querySelector("#status").style.color="green";
    })
    .catch(error => {
    document.querySelector("#status").innerText= "There was an error!\n "+error;
    document.querySelector("#status").style.color="red";
    } );
}