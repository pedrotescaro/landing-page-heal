                                document.getElementById('abrir-assinatura').addEventListener('click', function() {
                                document.getElementById('assinatura').click();
                            });

                            document.getElementById('assinatura').addEventListener('change', function(event) {
                                const img = document.getElementById('assinatura-preview-img');
                                const text = document.getElementById('assinatura-preview-text');
                                const removerBtn = document.getElementById('remover-assinatura');
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

                            document.getElementById('remover-assinatura').addEventListener('click', function() {
                                const fileInput = document.getElementById('assinatura');
                                const img = document.getElementById('assinatura-preview-img');
                                const text = document.getElementById('assinatura-preview-text');
                                fileInput.value = '';
                                img.src = '';
                                img.style.display = 'none';
                                text.style.display = 'none';
                                this.style.display = 'none';
                            });