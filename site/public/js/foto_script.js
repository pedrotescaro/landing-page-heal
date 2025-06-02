    document.getElementById('abrir-camera').addEventListener('click', function() {
                document.getElementById('foto_ferida').click();
            });

            document.getElementById('foto_ferida').addEventListener('change', function(event) {
                const img = document.getElementById('photo-preview-img');
                const text = document.getElementById('photo-preview-text');
                const removerBtn = document.getElementById('remover-foto');
                if (event.target.files && event.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        img.src = e.target.result;
                        img.style.display = 'block';
                        text.style.display = 'block';
                        removerBtn.style.display = 'inline-block';
                    };
                    reader.readAsDataURL(event.target.files[0]);
                } else {
                    img.style.display = 'none';
                    text.style.display = 'none';
                    removerBtn.style.display = 'none';
                }
            });

            document.getElementById('remover-foto').addEventListener('click', function() {
                const fileInput = document.getElementById('foto_ferida');
                const img = document.getElementById('photo-preview-img');
                const text = document.getElementById('photo-preview-text');
                fileInput.value = '';
                img.src = '';
                img.style.display = 'none';
                text.style.display = 'none';
                this.style.display = 'none';
            });

            