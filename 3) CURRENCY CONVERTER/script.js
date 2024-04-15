//https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
//https://flagsapi.com/BE/flat/64.png

const inputDropDown=document.getElementById('input-currency');
const outputDropDown=document.getElementById('output-currency');

for (const iterator in countryList) {
    let opt=document.createElement('option');

    opt.innerHTML=`${iterator}`;
    opt.setAttribute('value',iterator);

    let optClone=opt.cloneNode(true);

    inputDropDown.append(optClone);
    outputDropDown.append(opt);
}

const button=document.querySelector('#convert');
button.addEventListener('click',async ()=>{
    let inputCountryCode=inputDropDown.value.toLowerCase();
    let outputCountryCode=outputDropDown.value.toLowerCase();
    const res = await (await (fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${inputCountryCode}.json`))).json();
    const value = res[inputCountryCode][outputCountryCode];
    const amount = parseInt(document.querySelector('#input-box').value);
    document.querySelector('.output-box').innerHTML=value*amount;
})