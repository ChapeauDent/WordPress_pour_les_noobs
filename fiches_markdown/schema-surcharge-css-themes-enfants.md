# Schéma : Surcharge CSS avec les Thèmes Enfants WordPress

## Vue d'ensemble de la surcharge CSS

Ce schéma illustre comment un thème enfant permet de surcharger les styles CSS d'un thème parent, en prenant l'exemple d'un composant header avec ses fichiers HTML, CSS et JavaScript.

```mermaid
block-beta
  columns 3
  
  block:parent["THÈME PARENT"]:3
    columns 3
    parentHTML["header.html"] parentCSS["header.css"] parentJS["header.js"]
  end
  
  space:3
  
  down1<["Héritage"]>(down) space down2<["Chargement prioritaire"]>(down)
  
  space:3
  
  block:child["THÈME ENFANT"]:3
    columns 3
    childHTML["header.html<br/>(optionnel)"] childCSS["style.css<br/>(surcharge)"] childJS["functions.php<br/>(enqueue)"]
  end
  
  space:3
  
  arrow<["Application finale"]>(down) space:2
  
  space:3
  
  block:result["RENDU FINAL"]:3
    columns 1
    finalResult["HTML du parent<br/>+ CSS surchargé<br/>+ JS combiné"]
  end

  classDef parentTheme fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
  classDef childTheme fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
  classDef result fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  
  class parent parentTheme
  class child childTheme
  class result result
```

## Détail de la surcharge CSS : Exemple header

```mermaid
block-beta
  columns 4
  
  block:step1["1. THÈME PARENT"]:1
    columns 1
    step1Title["twentytwentyfour"]
    step1File["header.css"]
    step1Code[".site-header {<br/>background: #fff;<br/>padding: 20px;<br/>border: none;<br/>}"]
  end
  
  plus1["+"]
  
  block:step2["2. THÈME ENFANT"]:1
    columns 1
    step2Title["mon-theme-enfant"]
    step2File["style.css"]
    step2Code[".site-header {<br/>background: #2c3e50;<br/>padding: 30px;<br/>border-radius: 10px;<br/>}"]
  end
  
  equals["="]
  
  block:step3["3. RÉSULTAT"]:1
    columns 1
    step3Title["Surcharge appliquée"]
    step3File["Styles combinés"]
    step3Code[".site-header {<br/>background: #2c3e50;<br/>padding: 30px;<br/>border-radius: 10px;<br/>}"]
  end

  classDef operation fill:#fff3e0,stroke:#f57c00,stroke-width:2px,font-size:24px;
  classDef parent fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
  classDef child fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
  classDef result fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  
  class plus1,equals operation
  class step1 parent
  class step2 child
  class step3 result
```

## Ordre de chargement des fichiers CSS

```mermaid
block-beta
  columns 1
  
  browser["NAVIGATEUR"]
  arrow1<["Demande la page"]>(down)
  
  wordpress["WORDPRESS"]
  arrow2<["Traitement des styles"]>(down)
  
  block:loading["ORDRE DE CHARGEMENT"]:1
    columns 1
    step1["1. style.css du thème PARENT"]
    step2["2. style.css du thème ENFANT"]
    step3["3. CSS additionnels (plugins, custom)"]
  end
  
  arrow3<["Cascade CSS"]>(down)
  
  block:cascade["PRINCIPE DE CASCADE"]:1
    columns 1
    rule1["Dernière règle = Priorité"]
    rule2["Même sélecteur = Enfant gagne"]
    rule3["Spécificité identique = Ordre compte"]
  end
  
  arrow4<["Rendu final"]>(down)
  
  final["AFFICHAGE AVEC SURCHARGES"]

  classDef system fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
  classDef process fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
  classDef result fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  
  class browser,wordpress system
  class loading,cascade process
  class final result
```

## Structure fichiers : Thème parent vs Thème enfant

```mermaid
block-beta
  columns 2
  
  block:parentStructure["THÈME PARENT (twentytwentyfour)"]:1
    columns 1
    parentFiles["📁 twentytwentyfour/<br/>├── style.css<br/>├── index.php<br/>├── functions.php<br/>├── header.php<br/>├── footer.php<br/>└── templates/<br/>    ├── header.html<br/>    └── parts/"]
  end
  
  block:childStructure["THÈME ENFANT (mon-theme-enfant)"]:1
    columns 1
    childFiles["📁 mon-theme-enfant/<br/>├── style.css ⭐<br/>├── functions.php ⭐<br/>└── (fichiers surchargés)"]
    childNote["⭐ Fichiers essentiels<br/>pour la surcharge"]
  end
  
  space:2
  
  block:childContent["CONTENU style.css ENFANT"]:2
    columns 1
    cssHeader["/*<br/>Theme Name: Mon Thème Enfant<br/>Template: twentytwentyfour<br/>*/"]
    cssImport["@import url('../twentytwentyfour/style.css');"]
    cssCustom["/* === SURCHARGES === */<br/>.site-header {<br/>  background: #2c3e50;<br/>  color: white;<br/>}"]
  end

  classDef parent fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
  classDef child fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
  classDef code fill:#f5f5f5,stroke:#666,stroke-width:1px,font-family:monospace;
  
  class parentStructure parent
  class childStructure child
  class childContent code
```

## Exemple concret : Surcharge du header

```mermaid
block-beta
  columns 3
  
  block:original["AVANT (Thème parent)"]:1
    columns 1
    originalCode[".site-header {<br/>  background: #ffffff;<br/>  padding: 1rem;<br/>  border-bottom: 1px solid #e0e0e0;<br/>  color: #333333;<br/>}"]
    originalPreview["🖼️ Header blanc classique<br/>avec bordure grise"]
  end
  
  arrow<["Surcharge"]>(right)
  
  block:modified["APRÈS (Thème enfant)"]:1
    columns 1
    modifiedCode[".site-header {<br/>  background: linear-gradient(<br/>    135deg, #667eea, #764ba2<br/>  );<br/>  padding: 2rem;<br/>  border: none;<br/>  border-radius: 0 0 20px 20px;<br/>  color: white;<br/>  box-shadow: 0 4px 15px rgba(0,0,0,0.1);<br/>}"]
    modifiedPreview["🖼️ Header avec dégradé<br/>moderne et ombré"]
  end

  classDef before fill:#ffebee,stroke:#c62828,stroke-width:2px;
  classDef after fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  classDef arrow fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
  
  class original before
  class modified after
  class arrow arrow
```

## Avantages de la surcharge par thème enfant

```mermaid
block-beta
  columns 2
  
  block:advantages["AVANTAGES"]:1
    columns 1
    adv1["🔒 Sécurité<br/>Modifications préservées"]
    adv2["🔄 Mises à jour<br/>Thème parent actualisable"]
    adv3["⚡ Performance<br/>Héritage optimisé"]
    adv4["🎨 Flexibilité<br/>Surcharge sélective"]
    adv5["🔧 Maintenance<br/>Code organisé"]
  end
  
  block:process["PROCESSUS"]:1
    columns 1
    proc1["1. Créer dossier thème enfant"]
    proc2["2. style.css avec Template"]
    proc3["3. @import du parent"]
    proc4["4. Ajouter surcharges CSS"]
    proc5["5. Activer thème enfant"]
  end

  classDef advantage fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  classDef process fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
  
  class advantages advantage
  class process process
```

## CSS spécifique : Règles de priorité

```mermaid
block-beta
  columns 1
  
  title["RÈGLES DE PRIORITÉ CSS"]
  
  block:priority["ORDRE DE PRIORITÉ (du plus fort au plus faible)"]:1
    columns 1
    rule1["1. !important inline<br/>style='color: red !important'"]
    rule2["2. IDs<br/>#header { color: blue; }"]
    rule3["3. Classes, attributs, pseudo-classes<br/>.header, [type='text'], :hover"]
    rule4["4. Éléments et pseudo-éléments<br/>div, h1, ::before"]
    rule5["5. Ordre d'apparition<br/>Dernière règle = priorité"]
  end
  
  space
  
  block:childAdvantage["AVANTAGE THÈME ENFANT"]:1
    columns 1
    advantage["Le CSS du thème enfant est chargé APRÈS<br/>celui du parent, donc il a la priorité<br/>même avec la même spécificité !"]
  end

  classDef priority fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
  classDef highlight fill:#e8f5e8,stroke:#388e3c,stroke-width:2px;
  
  class priority priority
  class childAdvantage highlight
```

---

## Résumé technique

**La surcharge CSS avec les thèmes enfants fonctionne grâce à :**

1. **Héritage** : Le thème enfant hérite de tous les fichiers du parent
2. **Ordre de chargement** : CSS enfant chargé après CSS parent
3. **Cascade CSS** : Dernière règle avec même spécificité = priorité
4. **Sélectivité** : Seuls les styles redéfinis sont surchargés
5. **Sécurité** : Modifications préservées lors des mises à jour

**Fichiers clés :**
- `style.css` : Contient les surcharges CSS
- `functions.php` : Gère l'enqueue des styles
- Template header : Indique le thème parent

Cette approche garantit une personnalisation sûre et maintenable de l'apparence WordPress.
