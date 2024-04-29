export async function authentication() {
    let URL = process.env.REACT_APP_COMPILER_URL
    let token = localStorage.getItem("token");
    const fetchData = await fetch(`${URL}/middleware/auth`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authentication":token
        }
    });

    if(fetchData.status === 200) {
        return "200"
    }
    else {
        return "401"
    }
}