const fs = require('fs');
const path = require('path');

// Configuration
const markdownDir = path.join(__dirname, '../fiches_markdown');
const outputFile = path.join(markdownDir, 'files-list.json');

// Fonction pour extraire le titre d'un fichier markdown
function extractTitle(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Chercher le premier titre H1 (#)
        for (const line of lines) {
            if (line.startsWith('# ')) {
                return line.substring(2).trim();
            }
        }
        
        // Si pas de titre H1, utiliser le nom du fichier
        return path.basename(filePath, '.md')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    } catch (error) {
        console.warn(`Impossible de lire ${filePath}:`, error.message);
        return path.basename(filePath, '.md');
    }
}

// Fonction pour générer une description basée sur le contenu
function extractDescription(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Chercher la première phrase après le titre
        let foundTitle = false;
        for (const line of lines) {
            if (line.startsWith('# ')) {
                foundTitle = true;
                continue;
            }
            
            if (foundTitle && line.trim() && !line.startsWith('#')) {
                return line.trim().substring(0, 100) + (line.length > 100 ? '...' : '');
            }
        }
        
        return 'Documentation technique';
    } catch (error) {
        return 'Documentation technique';
    }
}

// Fonction principale
function generateFilesList() {
    try {
        // Vérifier que le dossier existe
        if (!fs.existsSync(markdownDir)) {
            console.error(`Le dossier ${markdownDir} n'existe pas`);
            return;
        }

        // Lire tous les fichiers .md
        const files = fs.readdirSync(markdownDir)
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(markdownDir, file);
                const title = extractTitle(filePath);
                const description = extractDescription(filePath);
                
                return {
                    path: `fiches_markdown/${file}`,
                    title: `📄 ${title}`,
                    description: description
                };
            })
            .sort((a, b) => a.title.localeCompare(b.title)); // Tri alphabétique

        // Créer l'objet final
        const result = {
            files: files,
            generated: new Date().toISOString(),
            count: files.length
        };

        // Écrire le fichier JSON
        fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
        
        console.log(`✅ Liste générée avec succès: ${files.length} fichiers trouvés`);
        console.log(`📁 Fichier de sortie: ${outputFile}`);
        
        files.forEach(file => {
            console.log(`   - ${file.title}`);
        });

    } catch (error) {
        console.error('❌ Erreur lors de la génération:', error.message);
    }
}

// Exécuter le script
generateFilesList();
