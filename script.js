const genreSelect = document.getElementById('selecione');
const recommenderButton = document.getElementById('recomendar');
const resultadoDiv = document.getElementById('resultado');

recommenderButton.addEventListener('click', function() {
    const selectedGenre = genreSelect.value;
    if (!selectedGenre) {
        resultadoDiv.innerHTML = '<p style="text-align:center;">Escolha um gênero primeiro.</p>';
        return;
    }

    const genreContainer = document.querySelector(`.item[data-genre="${selectedGenre}"]`);

    if (genreContainer) {
        const allTitles = genreContainer.querySelectorAll('h3');
        const allImages = genreContainer.querySelectorAll('img');
        const allQuotes = genreContainer.querySelectorAll('blockquote');
        const numberOfAlbums = allTitles.length;

        if (numberOfAlbums > 0) {
            const randomIndex = Math.floor(Math.random() * numberOfAlbums);
            const title = allTitles[randomIndex].textContent;
            const imageUrl = allImages[randomIndex].src;
            const quote = allQuotes[randomIndex].textContent;

            const htmlResultado = `
                <img src="${imageUrl}" alt="Capa do álbum ${title}">
                <h3>${title}</h3>
                <blockquote>${quote}</blockquote>
            `;
            
            resultadoDiv.innerHTML = htmlResultado;
            const Container = document.querySelector('.itens');
            if (Container) {
                Container.style.display = 'block';
            }

        } else {
            resultadoDiv.innerHTML = '<p style="text-align:center;">Nenhum álbum encontrado neste gênero.</p>';
        }
        
    } else {
        resultadoDiv.innerHTML = '<p style="text-align:center;">Nenhuma recomendação encontrada para este gênero.</p>';
    }
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');
        
        let isFormValid = true;

        if (nome.value.trim() === '') {
            showError(nome, 'O campo nome é obrigatório.');
            isFormValid = false;
        } else {
            showSuccess(nome);
        }

        if (email.value.trim() === '') {
            showError(email, 'O campo email é obrigatório.');
            isFormValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido.');
            isFormValid = false;
        } else {
            showSuccess(email);
        }

        if (mensagem.value.trim() === '') {
            showError(mensagem, 'O campo mensagem é obrigatório.');
            isFormValid = false;
        } else {
            showSuccess(mensagem);
        }

        if (isFormValid) {
            alert('Mensagem enviada com sucesso.');
            contactForm.reset();
            clearErrors();
        }
    });
}

function showError(input, message) {
    const form = input.parentElement;
    form.className = 'form-group error';
    const errorMessage = form.querySelector('.error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerText = message;
}

function showSuccess(input) {
    const form = input.parentElement;
    form.className = 'form-group success';
    const errorMessage = form.querySelector('.error-message');
    errorMessage.style.display = 'none';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
    document.querySelectorAll('.form-group').forEach(form => {
        form.className = 'form-group';
        if (form.querySelector('.error-message')) {
            form.querySelector('.error-message').style.display = 'none';
        }
    });
}