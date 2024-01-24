const dropShipButton = document.createElement("button");

const addToDropList = (item)=>{
    try {

        // Save item data to extension local storage using ASIN as the key
        chrome.storage.sync.set({ [item.id]: item }, function() {
            console.log(`Data for ASIN ${item.id} saved in extension local storage`);
        });
    } catch (error) {
        console.log('Error adding item to list:', error);
    }
}
const item = {}

// Set inline styles
dropShipButton.textContent = "Dropship this Item"; // Set the button text
dropShipButton.type="button"
dropShipButton.style.backgroundColor = "green";
dropShipButton.style.color = "white";
dropShipButton.style.padding = "10px";
dropShipButton.style.border = "none";
dropShipButton.style.borderRadius = "5px";
dropShipButton.style.cursor = "pointer";
dropShipButton.addEventListener("click", () => addToDropList(item));
const actionBox = document.querySelector(".quantity--info--Lv_Aw6e"); // Replace with the actual ID or selector of your container


setTimeout(item.name = document.querySelector("[data-pl='product-title']").outerText, 1000)
item.href = document.location.href
item.id = (document.location.href).substring(document.location.href.indexOf("m/") + 2,document.location.href.indexOf("m/") + 18)
const images = document.querySelectorAll(".slider--img--D7MJNPZ img")
const imageSrc = []
for(const image of images){
    imageSrc.push(image.getAttribute("src"))
}
item.pics = imageSrc

// Append the green button to the 'actionBox' container
if (actionBox) {
    actionBox.appendChild(dropShipButton);
} else {
    console.error("Container 'actionBox' not found");
}

