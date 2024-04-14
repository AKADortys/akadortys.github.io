// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
    // Récupère toutes les sections .sub-experience
    const subExperiences = document.querySelectorAll('.sub-experience');

    // Ajoute un gestionnaire de clic à chaque section .sub-experience
    subExperiences.forEach((experience) => {
        // Récupère l'image, le titre et les paragraphes de chaque section
        const image = experience.querySelector('img');
        const title = experience.querySelector('h2');
        const paragraphs = experience.querySelectorAll('p');

        // Ajoute un gestionnaire de clic à la section .sub-experience
        experience.addEventListener('click', () => {
            // Affiche les titres et paragraphes de la section cliquée
            title.style.display = 'block';
            paragraphs.forEach(paragraph => {
                paragraph.style.display = 'block';
            });
            // Cache l'image de la section cliquée
            image.style.display = 'none';

            // Cache les images des autres sections
            subExperiences.forEach((exp) => {
                if (exp !== experience) {
                    exp.querySelector('img').style.display = 'block';
                }
            });

            // Cache les titres et paragraphes des autres sections
            subExperiences.forEach((exp) => {
                if (exp !== experience) {
                    exp.querySelector('h2').style.display = 'none';
                    exp.querySelectorAll('p').forEach(paragraph => {
                        paragraph.style.display = 'none';
                    });
                }
            });
        });
    });
});
