document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    alert('Enviando email');
    const response = await fetch("/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            suaEmpresa: document.getElementById("suaEmpresa").value,
            mensagem: document.getElementById("mensagem").value
        })
    });
    const resposta_json = await response.json()
    alert(resposta_json.message);
});