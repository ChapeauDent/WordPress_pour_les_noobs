// Configuration de Marked avec options
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {}
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });

        const fileSelector = document.getElementById('fileSelector');
        const content = document.getElementById('content');
        const tocContent = document.getElementById('toc-content');

        // Fonction pour charger la liste des fichiers disponibles
        async function loadFilesList() {
            try {
                const response = await fetch('/fiches_markdown/files-list.json');
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // Vider le sélecteur et ajouter l'option par défaut
                fileSelector.innerHTML = '<option value="">Sélectionner un fichier...</option>';
                
                // Ajouter chaque fichier comme option
                data.files.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file.path;
                    option.textContent = file.title;
                    option.title = file.description; // Tooltip avec la description
                    fileSelector.appendChild(option);
                });
                
                console.log(`${data.files.length} fichiers chargés dans le sélecteur`);
                
            } catch (error) {
                console.error('Erreur lors du chargement de la liste des fichiers:', error);
                fileSelector.innerHTML = '<option value="">Erreur de chargement des fichiers</option>';
            }
        }

        // Fonction pour générer la table des matières dans la sidebar
        function generateSidebarTOC() {
            const headings = content.querySelectorAll('h1, h2, h3, h4');
            if (headings.length < 2) {
                tocContent.innerHTML = '<p style="color: var(--text-light); font-style: italic;">Aucun titre détecté</p>';
                return;
            }

            const tocList = document.createElement('ul');
            
            headings.forEach((heading, index) => {
                // Créer un ID unique pour chaque titre
                const id = `heading-${index}`;
                heading.id = id;

                const li = document.createElement('li');
                const link = document.createElement('a');
                
                link.href = `#${id}`;
                link.textContent = heading.textContent;
                link.className = `toc-${heading.tagName.toLowerCase()}`;
                
                // Ajouter les classes de style selon le niveau
                if (heading.tagName === 'H1') link.classList.add('toc-h1');
                else if (heading.tagName === 'H2') link.classList.add('toc-h2');
                else if (heading.tagName === 'H3') link.classList.add('toc-h3');
                else if (heading.tagName === 'H4') link.classList.add('toc-h4');

                li.appendChild(link);
                tocList.appendChild(li);
            });

            tocContent.innerHTML = '';
            tocContent.appendChild(tocList);
            
            // Ajouter la détection de scroll pour highlighting
            setupScrollSpy();
        }

        // Fonction pour highlighter l'élément actuel dans la TOC
        function setupScrollSpy() {
            const headings = content.querySelectorAll('h1, h2, h3, h4');
            const tocLinks = tocContent.querySelectorAll('a');

            function updateActiveLink() {
                let activeHeading = null;
                
                // Trouver le titre le plus proche du haut de la page
                headings.forEach(heading => {
                    const rect = heading.getBoundingClientRect();
                    if (rect.top <= 100) { // 100px de marge
                        activeHeading = heading;
                    }
                });

                // Mettre à jour les classes active
                tocLinks.forEach(link => link.classList.remove('active'));
                
                if (activeHeading) {
                    const activeLink = tocContent.querySelector(`a[href="#${activeHeading.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }

            // Écouter le scroll
            window.addEventListener('scroll', updateActiveLink);
            updateActiveLink(); // Appel initial
        }
        // Fonction pour charger un fichier Markdown
        async function loadMarkdownFile(filename) {
            if (!filename) {
                content.innerHTML = '<div class="loading">Sélectionnez un fichier à afficher</div>';
                tocContent.innerHTML = '<p style="color: var(--text-light); font-style: italic;">Chargez un document pour voir la table des matières</p>';
                return;
            }

            try {
                content.innerHTML = '<div class="loading">Chargement en cours</div>';
                tocContent.innerHTML = '<p style="color: var(--text-light); font-style: italic;">Chargement...</p>';
                
                const response = await fetch(filename);
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                
                const markdownText = await response.text();
                const html = marked.parse(markdownText);
                content.innerHTML = html;

                // Appliquer la coloration syntaxique
                content.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });

                // Générer la table des matières dans la sidebar
                generateSidebarTOC();

            } catch (error) {
                console.error('Erreur de chargement:', error);
                content.innerHTML = `
                    <div style="color: var(--error-color); text-align: center; padding: 50px; background: var(--error-bg); border-radius: 10px; border: 1px solid var(--error-border);">
                        <h2>❌ Erreur de chargement</h2>
                        <p>Impossible de charger le fichier: ${filename}</p>
                        <p><em>${error.message}</em></p>
                    </div>
                `;
                tocContent.innerHTML = '<p style="color: var(--error-color); font-style: italic;">Erreur de chargement</p>';
            }
        }

        // Event listener pour le sélecteur de fichier
        fileSelector.addEventListener('change', (e) => {
            loadMarkdownFile(e.target.value);
        });

        // Charger la liste des fichiers et le premier fichier par défaut
        window.addEventListener('load', async () => {
            await loadFilesList();
            
            // Charger le premier fichier disponible par défaut
            const firstOption = fileSelector.querySelector('option[value]:not([value=""])');
            if (firstOption) {
                loadMarkdownFile(firstOption.value);
                fileSelector.value = firstOption.value;
            }
        });

        // Smooth scroll pour les liens d'ancrage
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Mettre à jour immédiatement l'active link
                    setTimeout(() => {
                        const tocLinks = tocContent.querySelectorAll('a');
                        tocLinks.forEach(link => link.classList.remove('active'));
                        
                        const activeLink = tocContent.querySelector(`a[href="${e.target.getAttribute('href')}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }, 100);
                }
            }
        });
        // === SYSTÈME DE ZOOM D'IMAGES ===
        
        // Créer le modal de zoom
        function createZoomModal() {
            const modal = document.createElement('div');
            modal.className = 'image-zoom-modal';
            modal.innerHTML = `
                <button class="zoom-close" aria-label="Fermer le zoom">✕</button>
                <img src="" alt="" />
                <div class="zoom-indicator">Cliquer pour fermer</div>
            `;
            document.body.appendChild(modal);
            return modal;
        }

        // Variables du système de zoom
        let zoomModal = null;
        let isZoomed = false;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let scale = 1;

        // Initialiser le système de zoom
        function initImageZoom() {
            if (!zoomModal) {
                zoomModal = createZoomModal();
                
                const closeBtn = zoomModal.querySelector('.zoom-close');
                const zoomedImage = zoomModal.querySelector('img');
                
                // Fermer avec le bouton
                closeBtn.addEventListener('click', closeZoom);
                
                // Fermer en cliquant sur le fond
                zoomModal.addEventListener('click', (e) => {
                    if (e.target === zoomModal) {
                        closeZoom();
                    }
                });
                
                // Fermer avec Escape
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && isZoomed) {
                        closeZoom();
                    }
                });

                // === GESTION DES GESTES TACTILES ET SOURIS ===
                
                // Desktop - Molette de souris pour zoom
                zoomedImage.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? 0.9 : 1.1;
                    scale = Math.max(0.5, Math.min(3, scale * delta));
                    zoomedImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
                    updateZoomIndicator();
                });

                // Desktop - Drag avec souris
                zoomedImage.addEventListener('mousedown', startDrag);
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', endDrag);

                // Mobile - Gestes tactiles
                let touches = {};
                let lastDistance = 0;

                zoomedImage.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    
                    if (e.touches.length === 1) {
                        // Single touch - drag
                        startDrag(e.touches[0]);
                    } else if (e.touches.length === 2) {
                        // Pinch to zoom
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        lastDistance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                    }
                });

                zoomedImage.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    
                    if (e.touches.length === 1 && isDragging) {
                        // Single touch drag
                        drag(e.touches[0]);
                    } else if (e.touches.length === 2) {
                        // Pinch zoom
                        const touch1 = e.touches[0];
                        const touch2 = e.touches[1];
                        const distance = Math.hypot(
                            touch2.clientX - touch1.clientX,
                            touch2.clientY - touch1.clientY
                        );
                        
                        if (lastDistance > 0) {
                            const delta = distance / lastDistance;
                            scale = Math.max(0.5, Math.min(3, scale * delta));
                            zoomedImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
                            updateZoomIndicator();
                        }
                        lastDistance = distance;
                    }
                });

                zoomedImage.addEventListener('touchend', (e) => {
                    if (e.touches.length === 0) {
                        endDrag();
                        lastDistance = 0;
                    }
                });

                // Double tap pour reset zoom (mobile)
                let lastTap = 0;
                zoomedImage.addEventListener('touchend', (e) => {
                    if (e.touches.length === 0) {
                        const currentTime = new Date().getTime();
                        const tapLength = currentTime - lastTap;
                        if (tapLength < 500 && tapLength > 0) {
                            // Double tap détecté
                            resetZoom();
                        }
                        lastTap = currentTime;
                    }
                });
            }
            
            // Ajouter les event listeners aux images du contenu
            addImageClickListeners();
        }

        // Fonctions de gestion du drag
        function startDrag(e) {
            isDragging = true;
            startX = (e.clientX || e.pageX) - currentX;
            startY = (e.clientY || e.pageY) - currentY;
            zoomModal.querySelector('img').style.cursor = 'grabbing';
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            currentX = (e.clientX || e.pageX) - startX;
            currentY = (e.clientY || e.pageY) - startY;
            
            const zoomedImage = zoomModal.querySelector('img');
            zoomedImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        }

        function endDrag() {
            isDragging = false;
            if (zoomModal && zoomModal.querySelector('img')) {
                zoomModal.querySelector('img').style.cursor = 'grab';
            }
        }

        // Reset du zoom
        function resetZoom() {
            scale = 1;
            currentX = 0;
            currentY = 0;
            const zoomedImage = zoomModal.querySelector('img');
            zoomedImage.style.transform = 'translate(0px, 0px) scale(1)';
            updateZoomIndicator();
        }

        // Mise à jour de l'indicateur de zoom
        function updateZoomIndicator() {
            const indicator = zoomModal.querySelector('.zoom-indicator');
            const zoomPercentage = Math.round(scale * 100);
            
            if (window.innerWidth <= 768) {
                indicator.textContent = `${zoomPercentage}% • Pincer pour zoomer • Glisser pour déplacer`;
            } else {
                indicator.textContent = `${zoomPercentage}% • Molette pour zoomer • Glisser pour déplacer • Cliquer pour fermer`;
            }
        }

        // Ajouter les listeners aux images
        function addImageClickListeners() {
            const images = content.querySelectorAll('.markdown-content img');
            
            images.forEach(img => {
                // Vérifier si l'image est assez grande pour justifier un zoom
                img.addEventListener('load', function() {
                    if (this.naturalWidth > 300 || this.naturalHeight > 300) {
                        this.style.cursor = 'zoom-in';
                        this.addEventListener('click', () => openZoom(this));
                    } else {
                        this.style.cursor = 'default';
                    }
                });
                
                // Si l'image est déjà chargée
                if (img.complete && (img.naturalWidth > 300 || img.naturalHeight > 300)) {
                    img.style.cursor = 'zoom-in';
                    img.addEventListener('click', () => openZoom(img));
                }
            });
        }

        // Ouvrir le zoom
        function openZoom(originalImage) {
            if (!zoomModal) return;
            
            const zoomedImage = zoomModal.querySelector('img');
            zoomedImage.src = originalImage.src;
            zoomedImage.alt = originalImage.alt;
            
            // Reset des valeurs
            resetZoom();
            
            // Afficher le modal
            zoomModal.classList.add('active');
            isZoomed = true;
            document.body.style.overflow = 'hidden';
            
            // Mettre à jour l'indicateur
            updateZoomIndicator();
        }

        // Fermer le zoom
        function closeZoom() {
            if (!zoomModal) return;
            
            zoomModal.classList.remove('active');
            isZoomed = false;
            document.body.style.overflow = '';
            
            // Reset des valeurs
            resetZoom();
        }

        // Initialiser le zoom après chaque chargement de contenu
        const originalLoadMarkdownFile = loadMarkdownFile;
        loadMarkdownFile = async function(filename) {
            await originalLoadMarkdownFile(filename);
            
            // Réinitialiser le zoom pour les nouvelles images
            setTimeout(() => {
                initImageZoom();
            }, 100);
        };

        // Initialiser le zoom au chargement de la page
        window.addEventListener('load', () => {
            setTimeout(() => {
                initImageZoom();
            }, 500);
        });