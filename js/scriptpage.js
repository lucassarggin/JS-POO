class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar(){
        let produto = this.lerDados();
    
        if(this.validaCampos(produto)) {
            this.adicionar(produto);
        }
    
        this.listaTabela();
        this.cancelar();
    }   

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valor;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/deletar-lixeira.png';
            imgDelete.setAttribute("onClick","produto.deletar('+ this.arrayProdutos[i].id')");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            td_acoes.classList.add('center');

        }
    }
    
    adicionar(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }   

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;

        return produto;
    }

    validaCampos(produto) {
        let msg ='';

        if(produto.nomeProduto == '') {
            msg += '- Nome do produto obrigatório \n';
        }

        if(produto.valor == '') {
            msg += '- Valor do produto obrigatório \n';
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';
    }

    deletar(produto) {
        alert('Deletado');
    }
}
var produto = new Produto();