    
const extension = async()=>{
    try{
        const item = {}
        setTimeout(item.productName = document.querySelector("[data-pl='product-title']").outerText, 1000)
        item.href = document.location.href
        item.productID = (document.location.href).substring(document.location.href.indexOf("m/") + 2,document.location.href.indexOf("m/") + 18)
        const images = document.querySelectorAll(".slider--img--D7MJNPZ img")
        const imageSrc = []
        for(const image of images){
            imageSrc.push(image.getAttribute("src"))
        }
        item.images = imageSrc

        const dropShipButton = document.createElement("button");
        const itemStatus = await fetch(`http://www.localhost:3000/getAliItem/${item.productID}`).then(res => {return res.json()})
        console.log(itemStatus)
        const addToDropList = async (item)=>{
            console.log(item)
            try {  
                const addStatus = await fetch("http://www.localhost:3000/addAliItem", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item)
                }).then(res => {return res.json()})
                console.log(addStatus)
                document.location.reload()
            } catch (error) {
                console.log('Error adding item to list:', error);
            }
        }

        // Set inline styles
        dropShipButton.addEventListener("click", () => addToDropList(item));
        const actionBox = document.querySelector(".quantity--info--Lv_Aw6e"); // Replace with the actual ID or selector of your container




        if(itemStatus.status == "Success"){
            dropShipButton.textContent = "Item has already been dropshipped"; // Set the button text
            dropShipButton.type="button"
            dropShipButton.style.backgroundColor = "orange";
            dropShipButton.style.color = "white";
            dropShipButton.style.padding = "10px";
            dropShipButton.style.border = "none";
            dropShipButton.style.borderRadius = "5px";
        }else{
            dropShipButton.textContent = "Dropship this Item"; // Set the button text
            dropShipButton.type="button"
            dropShipButton.style.backgroundColor = "green";
            dropShipButton.style.color = "white";
            dropShipButton.style.padding = "10px";
            dropShipButton.style.border = "none";
            dropShipButton.style.borderRadius = "5px";
            dropShipButton.style.cursor = "pointer";
        }

        // Append the green button to the 'actionBox' container
        if (actionBox) {
            actionBox.appendChild(dropShipButton);
        } else {
            console.error("Container 'actionBox' not found");
        }

    }catch(error){
        console.log("Error running extension:", error)
    }
}

extension()