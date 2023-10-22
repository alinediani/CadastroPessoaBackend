namespace CadastroPessoa
{
    public record Pessoa
    {
        public int Id { get; init; }
        public string NomeCompleto { get; init; }
        public DateTime DataNascimento { get; init; }
        public decimal ValorRenda { get; init; }
        public string CPF { get; init; }
    }
}

