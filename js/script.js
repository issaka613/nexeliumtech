/* script 1 */
document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments de formulaire
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        // Vérifier si le champ a déjà du contenu au chargement
        if (input.value !== '') {
            group.querySelector('label').style.top = '-10px';
            group.querySelector('label').style.fontSize = '12px';
            group.querySelector('label').style.color = '#4361ee';
        }
        
        input.addEventListener('focus', function() {
            group.querySelector('.focus-border').style.width = '100%';
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                group.querySelector('.focus-border').style.width = '0';
            }
        });
    });
    
    // Animation du bouton d'envoi
    const submitBtn = document.querySelector('.submit-btn');
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation d'envoi
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.style.background = 'linear-gradient(to right, #4CAF50, #2E7D32)';
        
        // Simulation d'envoi
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message envoyé !</span>';
            
            // Réinitialisation après 3 secondes
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Envoyer le message</span><svg viewBox="0 0 13 10" height="10px" width="15px"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg>';
                submitBtn.style.background = 'linear-gradient(to right, var(--primary-color), var(--secondary-color))';
                contactForm.reset();
                
                // Réinitialiser les labels
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea');
                    if (input.value === '') {
                        group.querySelector('label').style.top = '15px';
                        group.querySelector('label').style.fontSize = '16px';
                        group.querySelector('label').style.color = '#999';
                    }
                });
            }, 2000);
        }, 1500);
    });
    
    // Effet parallaxe sur l'image de fond
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const background = document.querySelector('.background-image');
        background.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
    });
    
    // Animation d'entrée du formulaire
    setTimeout(() => {
        document.querySelector('.contact-container').style.opacity = '1';
        document.querySelector('.contact-container').style.transform = 'translateY(0)';
    }, 300);
});



