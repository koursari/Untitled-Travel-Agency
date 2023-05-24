//Click on sidebar announcements should lead to a custom pop up
function announce(event){
    let x = document.getElementById("short-announce");
    x.style.display = "block";
    x.querySelector("span").textContent = event.currentTarget.getAttribute("data-text");
    let btn = x.querySelector("button").addEventListener("click", ()=>{x.style.display = "none"})
}

let announcementList = document.querySelectorAll(".sidebar ul li").forEach(i => i.addEventListener("click", announce));