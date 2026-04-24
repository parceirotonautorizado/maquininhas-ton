/**
 * Scripts da Landing Page Ton
 * Funcionalidades: Seleção de recebimento, FAQ accordion, Scroll suave
 */

// Selecionar tipo de recebimento (1 dia útil / Na hora)
function selecionarRecebimento(elemento) {
    document.querySelectorAll('.card-recebimento').forEach(card => card.classList.remove('ativo'));
    elemento.classList.add('ativo');
}

// FAQ - Abrir/Fechar perguntas
function toggleFaq(elemento) {
    const faqItem = elemento.parentElement;
    const estavaAberto = faqItem.classList.contains('aberto');
    
    // Fecha todos os itens do FAQ
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('aberto'));
    
    // Abre o item clicado se não estava aberto
    if (!estavaAberto) {
        faqItem.classList.add('aberto');
    }
}

// Scroll suave para links com âncora (#)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // altura do header fixo
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Abre o primeiro item do FAQ por padrão
    const primeiroFaq = document.querySelector('.faq-item');
    if (primeiroFaq) {
        primeiroFaq.classList.add('aberto');
    }

    console.log('✅ Landing Page Ton carregada com sucesso!');
});