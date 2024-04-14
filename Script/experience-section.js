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
            // Vérifie si la section est actuellement ouverte
            const isOpen = title.style.display === 'block';

            // Si la section est ouverte, la ferme ; sinon, l'ouvre
            if (isOpen) {
                title.style.display = 'none';
                paragraphs.forEach(paragraph => {
                    paragraph.style.display = 'none';
                });
                image.style.display = 'block';
            } else {
                title.style.display = 'block';
                paragraphs.forEach(paragraph => {
                    paragraph.style.display = 'block';
                });
                image.style.display = 'none';

                // Cache les titres, paragraphes et images des autres sections
                subExperiences.forEach((exp) => {
                    if (exp !== experience) {
                        exp.querySelector('h2').style.display = 'none';
                        exp.querySelectorAll('p').forEach(paragraph => {
                            paragraph.style.display = 'none';
                        });
                        exp.querySelector('img').style.display = 'block';
                    }
                });
            }
        });
    });
});
