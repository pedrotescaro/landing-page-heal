// Script de teste para o menu hambúrguer
console.log('=== TESTE DO MENU HAMBÚRGUER ===');

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    // Procura pelos elementos
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    console.log('Elementos encontrados:', {
        menuToggle: menuToggle,
        navLinks: navLinks
    });
    
    // Testa se o menu toggle existe
    if (menuToggle) {
        console.log('✅ Menu toggle encontrado!');
        
        // Adiciona evento de clique
        menuToggle.addEventListener('click', function(e) {
            console.log('🎯 Menu hambúrguer clicado!');
            e.preventDefault();
            e.stopPropagation();
            
            if (navLinks) {
                if (navLinks.classList.contains('active')) {
                    console.log('Fechando menu...');
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                } else {
                    console.log('Abrindo menu...');
                    navLinks.classList.add('active');
                    menuToggle.querySelector('i').classList.replace('fa-bars', 'fa-times');
                }
            }
        });
        
        // Adiciona evento de mouseenter para teste
        menuToggle.addEventListener('mouseenter', function() {
            console.log('🖱️ Mouse sobre o menu hambúrguer');
        });
        
        // Testa se o ícone existe
        const icon = menuToggle.querySelector('i');
        if (icon) {
            console.log('✅ Ícone encontrado:', icon.className);
        } else {
            console.log('❌ Ícone não encontrado');
        }
        
    } else {
        console.log('❌ Menu toggle NÃO encontrado!');
    }
    
    // Testa se navLinks existe
    if (navLinks) {
        console.log('✅ Nav links encontrado!');
    } else {
        console.log('❌ Nav links NÃO encontrado!');
    }
});

// Teste adicional - verifica se o script está sendo executado
console.log('Script de teste carregado!'); 