// Toggle Spinner
const toggleSpinner = displayInput => {
    document.getElementById('spinner').style.display = displayInput
}
// Phone api or onclick button
const searchButton = () => {
    const inputFiled = document.getElementById('input-filed')
    const inputText = inputFiled.value
    inputFiled.value = ''
    if (inputText == '') {
        alert('This enter value!!')
        document.getElementById('phone-detail-result').textContent = ''
        document.getElementById('phone-result').textContent = ''
    } else {
        toggleSpinner('block')
        document.getElementById('phone-detail-result').innerText = ''
        document.getElementById('phone-result').innerHTML = ''
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => phoneDetail(data.data))
    }
}
// Other Phones Detail
const phoneDetail = (phones) => {
    if (phones.length == 0) {
        alert('Not is phone a found.')
    }
    const phone = phones.slice(0, 20)
    const container = document.getElementById('phone-result')
    phone.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top phone-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="singlePhoneDetail('${phone.slug}')" class="btn other-detail">Other Detail</button>
            </div>
        </div>
    `
        container.appendChild(div)
    });
    toggleSpinner('none')
}
// Phone id
const singlePhoneDetail = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => otherPhoneDetail(data.data))
}
// Single phone Details
const otherPhoneDetail = (phone) => {
    const container = document.getElementById('phone-detail-result')
    container.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top phone-img" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p class="mb-1"><span class="text">Release Date:</span> ${phone.releaseDate ? phone.releaseDate:'No Release Date found.'}</p>
                <p class="mb-1"><span class="text">Brand:</span> ${phone.brand}</p>
                <p class="mb-1"><span class="text">Chip Set:</span> ${phone.mainFeatures.chipSet}</p>
                <p class="mb-1"><span class="text">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
                <p class="mb-1"><span class="text">Memory:</span> ${phone.mainFeatures.memory}</p>
                <p class="mb-1"><span class="text">Storage:</span> ${phone.mainFeatures.storage}</p>
                <p class="mb-1" id="anotherSensors-detail"></p>
                <p class="mb-1" id="another-detail"></p>
                <button id="sensors" onclick="sensors('${phone.mainFeatures.sensors}')" class="btn other-detail mt-1">Sensor</button>
                <button id="others" onclick="other('${phone.others?phone.others.Bluetooth:'Not is found.'}','${phone.others?phone.others.GPS:'Not is found.'}','${phone.others?phone.others.NFC:'Not is found.'}','${phone.others?phone.others.Radio:'Not is found.'}','${phone.others?phone.others.USB:'Not is found.'}','${phone.others?phone.others.WLAN:'Not is found.'}')" class="btn other-detail mt-2">Others</button>
                
            </div>
        </div>
    `
    container.appendChild(div)
}
// sensor button detail
const sensors = (sensor) => {
    const container = document.getElementById('anotherSensors-detail')
    container.textContent = ''
    const div = document.createElement('div')
    div.classList.add('sensor')
    div.innerHTML = `
        <p class="mb-1"><span class="text">Sensors:</span> ${sensor}</p>
    `
    container.appendChild(div)
    const sensorButton = document.getElementById('sensors')
    sensorButton.style.display = 'none'
}
// // Other button detail
const other = (bluetooth, gps, nfc, radio, usb, wlan) => {
    const container = document.getElementById('another-detail')
    container.textContent = ''
    const div = document.createElement('div')
    div.classList.add('other')
    div.innerHTML = `
        <p class="mb-1"><span class="text">Bluetooth:</span> ${bluetooth}</p>
        <p class="mb-1"><span class="text">GPS:</span> ${gps}</p>
        <p class="mb-1"><span class="text">NFC:</span> ${nfc}</p>
        <p class="mb-1"><span class="text">Radio:</span> ${radio}</p>
        <p class="mb-1"><span class="text">USB:</span> ${usb}</p>
        <p class="mb-1"><span class="text">WLAN:</span> ${wlan}</p>
    `
    container.appendChild(div)
    const otherButton = document.getElementById('others')
    otherButton.style.display = 'none'
}