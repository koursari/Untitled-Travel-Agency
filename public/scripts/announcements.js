//Click on sidebar announcements should lead to a custom pop up
function announce(event){
    let x = document.getElementById("short-announce");
    x.style.display = "block";
    let popTitle = x.querySelector("#pop-title");
    let popDate = x.querySelector("#pop-date");
    let popContent = x.querySelector("#pop-content");
    popTitle.innerText = event.currentTarget.dataset.title;
    let dateFormat = new Date(event.currentTarget.dataset.date);
    popDate.innerText = dateFormat.toLocaleDateString();
    popContent.innerText = event.currentTarget.dataset.text;

    let btn = x.querySelector("button").addEventListener("click", ()=>{x.style.display = "none"})
}

let announcementList = document.querySelectorAll(".sidebar ul li").forEach(i => i.addEventListener("click", announce));