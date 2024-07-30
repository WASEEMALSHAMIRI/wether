let form = document.getElementById('form')

////////////////////////
form.addEventListener('submit', (x) => {
    x.preventDefault()

    weather()
    form.reset()
})

let weather = async () => {

    try {
        const errors = document.getElementById('errors')
        const city = document.getElementById('city')
        const longitude = document.getElementById('longitude')
        const latitude = document.getElementById('latitude')
        const tempeerature = document.getElementById('tempeerature')
        const address = document.getElementById('address').value
        const resets = await fetch('http://localhost:5000/weather?address=' + address)
        const data = await resets.json()
        if (data.error) {
            document.querySelector("main").style.display = "none"
            document.querySelector(".sec").style.display = "block"
            errors.innerText = data.error

        }
        else {
            city.innerText = "";
            tempeerature.innerText = ""
            latitude.innerText = ""
            longitude.innerText = ""
            document.querySelector("main").style.display = "block"
            city.innerText = "country: "+address;
            setTimeout(() => {
                longitude.innerText ="longitude: "+ data.longitudes;
            }, 1000)
            setTimeout(() => {
                latitude.innerText ="latitude: " + data.latitudes;
            }, 2000)
            setTimeout(() => {
               
                tempeerature.innerText ="tempeerature: " + data.tempeeratures
            }, 3000)

        }
    } catch (x) {
        console.log(x)
    }
}