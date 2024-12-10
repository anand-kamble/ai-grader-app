const startup = new Promise((res,rej) => {
    console.log("startup ");
    res(true);
})


export default startup;