class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let produto = this.lerDados();
    
        if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
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
            imgEdit.setAttribute("onClick", "produto.preparaEditacao("+ JSON.stringify(this.arrayProdutos[i]) +")");


            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/deletar-lixeira.png';
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            td_acoes.classList.add('center');

        }
    }
    
    adicionar(produto){
        produto.valor = parseFloat(produto.valor);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
            
        }
    }    

    preparaEditacao(dados) {
        
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;

        document.getElementById('att').innerText = 'Atualizar';
    
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

        document.getElementById('att').innerText = 'Salvar';
        this.edit.id = null
    }

    deletar(id) {
        if(confirm('Deletar o produto do ID ' + id)){
            let index = this.arrayProdutos.findIndex(
                (produto) => produto.id == id
              );
              if (index !== -1) {
                this.arrayProdutos.splice(index, 1);
              }
              this.listaTabela();
        }
    }
}

var produto = new Produto();