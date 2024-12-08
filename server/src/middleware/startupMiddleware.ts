const startup = new Promise((res,rej) => {
    console.log("Midlleware")
    setTimeout(() => {
        console.log("started middleware")
        res(true);
    },2000)

})


export default startup;