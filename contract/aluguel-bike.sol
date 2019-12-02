pragma solidity 0.5.12;

contract Aluguelbike
{
    string public locadora;
    string public cliente;
    uint256 public valorDiaria=1 ether;
    uint256 public valorLocacao;
    bool[] public requisitoPreenchido;
    address payable public contaLocadora;
    address payable public contaCliente;
    uint256 public periodoDeLocacao;
    
    
    constructor() public{
        contaLocadora = 0x557D0Ecd8A9ae210519d1bD9B543723E04941eEe;
        locadora = 'LocaVerde';
        contaCliente = msg.sender;
    }  
        
    function alugar ( string memory nomeCliente,  uint256 _periodoDeLocacao) public payable returns(bool)
    {
        require (_periodoDeLocacao>=2, 'Minimo 2 dias');
        //require (msg.value==_periodoDeLocacao*(valorDiaria*2), '');

        cliente = nomeCliente;
        periodoDeLocacao = _periodoDeLocacao;
        valorLocacao = msg.value;
        return true;
    }
 
    function retornabike() public
    {
        require (msg.sender==contaLocadora, '');
        contaLocadora.transfer(valorLocacao/2);
        contaCliente.transfer(valorLocacao/2);
    }
}

