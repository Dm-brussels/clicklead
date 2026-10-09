# Isothermiq — flyer « billet de 500 € » (recto verso)

## Le concept

| Face | Rôle | Message |
|---|---|---|
| **Recto** | Créer la surprise et donner envie de retourner le billet | **500 €** · **FAUX BILLET.** · *Les vrais, votre immeuble les perd par le toit.* · « Retournez le billet » |
| **Verso** | Convertir | **Ce billet ne vaut rien… sauf pour ceci : AUDIT VISUEL GRATUIT et sans engagement** · services · preuves · contact + QR |

**L'idée de départ.** La mention SPECIMEN est obligatoire. Au lieu de la subir, on en fait l'accroche : *ce billet est faux, mais l'argent que votre immeuble perd est bien réel*. Au verso, le faux billet se transforme en bon à échanger contre une vraie prestation, l'audit gratuit. Le lien entre les deux faces vient donc de l'objet lui-même, pas d'un texte d'explication.

**La direction artistique, une thermographie.** Le violet du billet de 500 € correspond aussi aux zones froides d'une caméra thermique (palette « ironbow » : violet → magenta → orange → jaune).
- **L'illustration.** Un immeuble bruxellois « gravé » dont la toiture et les châssis chauffent, avec des euros qui s'échappent par le toit. C'est la vue que montrerait l'audit.
- **Le fond.** Des courbes **isothermes** jouent le rôle des guillochis d'un billet. C'est aussi un clin d'œil au nom *Isothermiq*.
- **Le lien entre les faces.** Au verso, le liseré thermique et les guillochis verts ou dorés font la jonction entre l'univers du billet et l'identité Isothermiq (vert forêt, crème, sable).

**Pas de chiffre d'économie.** Le montant de 500 € reste symbolique, ce que précise une mention au verso. Les « 30 % d'économies » affichés sur le site n'ont pas été repris, faute de justification propre aux copropriétés.

**Suivi des retours.** Le code « BILLET 500 » et le QR code (`?utm_source=billet500`) permettent de mesurer ce que rapporte la campagne.

## Fichiers (`output/`)

| Fichier | Usage |
|---|---|
| `Isothermiq_Billet500_RV_impression_CMYK.pdf` | **À envoyer à l'imprimeur.** 2 pages (recto puis verso), 166 × 88 mm, fonds perdus 3 mm, TrimBox 160 × 82 mm, CMJN, polices incorporées, vectoriel |
| `Isothermiq_Billet500_RV_traits-de-coupe_CMYK.pdf` | Même fichier avec traits de coupe, si l'imprimeur les demande |
| `Isothermiq_Billet500_RV_RGB.pdf` | Version RVB, pour un imprimeur qui fait sa propre conversion avec son profil |
| `*_recto_300dpi.png`, `*_verso_300dpi.png` | Visuels haute définition au format fini (1890 × 969 px) |
| `*_fonds-perdus_300dpi.png` | Mêmes visuels avec fonds perdus |
| `*_apercu_recto-verso.png`, `*_mise-en-situation.png` | Présentation client |

L'impression recto verso se fait sur le grand côté (tête-bêche horizontal standard). Papier conseillé : couché mat ou satiné 350 g, éventuellement pelliculé mat doux au toucher. Évitez les finitions métallisées ou holographiques, qui imiteraient des éléments de sécurité.

## Sources modifiables (`src/` + `tools/`)

- `src/recto.svg`, `src/verso.svg` : SVG vectoriels en millimètres, textes éditables (sauf SPECIMEN, vectorisé). Ils s'ouvrent dans Illustrator, Inkscape ou Affinity, à condition d'installer les polices de `src/fonts/`.
- `src/fonts/` : Barlow et Source Sans 3 (typographies du site), Inter (logo), Arimo (équivalent métrique d'Arial pour SPECIMEN). Toutes sous licence libre SIL OFL.
- `tools/build_faces.py` : générateur. Les textes, coordonnées et couleurs sont regroupés dans `CONTENT` et `PALETTE`.
- Pour tout régénérer :
  ```
  python3 tools/build_faces.py && node tools/render.mjs && python3 tools/prepress.py && node tools/mockup.mjs
  node tools/check_layout.mjs   # contrôle automatique des zones de sécurité
  ```
  Prérequis : Python avec qrcode, pikepdf et fonttools ; Node avec Playwright ; Ghostscript ; poppler-utils.

## Informations vérifiées sur isothermiq.be (09/10/2026)

- Téléphone et WhatsApp : 0473 55 86 32 · e-mail : contact@isothermiq.be · horaires : lundi–samedi 8h–20h
- Adresse : Drève Richelle 191, 1410 Waterloo · « Isothermiq Toiture, une activité d'ECO GROUP PARTNERS SRL » · TVA BE0776.639.705 · IPI 505 869
- Arguments repris tels quels : poseurs salariés (pas de sous-traitance), référent unique, garantie décennale, dossier primes Habitation (Wallonie) et Renolution (Bruxelles)
- Logo : géométrie officielle (`logo-dark.svg` du site) ; couleurs (`#1c402b`, `#245035`, `#faf7f1`, sable `#c4ad7b`…) et typographies relevées dans la feuille de styles du site
- QR code : `https://isothermiq.be/devis?utm_source=billet500`. La page répond (HTTP 200) et le code a été décodé avec succès sur les rendus RVB et CMJN.

## Capture d'écran (e-mail de prospection du 19/09/2026) : ce qu'elle confirme

- **Prestations** : toitures plates (toiture chaude, roofing APP/SBS), façades et pignons (ITE, ponts thermiques), toitures en pente et combles, châssis double ou triple vitrage. Ces quatre blocs sont confirmés par la communication d'Isothermiq elle-même.
- **Offre** : « audit visuel gratuit et sans engagement sur l'une des résidences de votre choix », pour **préparer les prochaines Assemblées Générales**. Cet argument a été ajouté au verso.
- **Signature de marque** : « L'isolation au service de votre patrimoine », ajoutée en en-tête du verso.
- **Arguments** : suivi direct par le patron sur chantier, garantie décennale et RC professionnelle. Ils ont été ajoutés aux preuves.
- **Zone** : Brabant wallon et Bruxelles. La mention « Wallonie » a été retirée, aucune des deux sources ne la présentant comme zone d'intervention.
- **Nom** : la communication signe « Isothermiq » et non « Isothermiq Toiture », ce qui justifie le logo sans la mention TOITURE.

## Points restant à valider avant impression

1. **Adresse e-mail** : l'e-mail utilise **info@isothermiq.be**, le site **contact@isothermiq.be**. Le flyer reprend contact@ (vérifiée sur le site). Il faut confirmer l'adresse à mettre en avant.
2. **Libellé de l'offre** : le site parle de « visite technique offerte », l'e-mail d'« audit visuel gratuit ». Le flyer reprend le libellé de l'e-mail.
3. **Mentions légales** : ECO GROUP PARTNERS SRL figure uniquement dans la ligne légale, sans son logo. On peut la retirer dans `CONTENT["legal"]`.
4. **Numéros de téléphone** : seul le 0473 55 86 32 est affiché. Le fixe 02/373.01.60 de l'e-mail est celui d'Eco Group Partners et n'apparaît pas sur le site Isothermiq.

## Billets en euros : règles de reproduction (BCE)

Le cadre est la décision BCE/2013/10, modifiée par la décision (UE) 2020/2090. Elle vise toute image qui reprend des éléments d'un billet (couleur, dimensions, chiffres…) ou qui en donne l'impression générale.

Ce que le flyer respecte :
- **Une création entièrement originale.** Il ne reprend aucun élément du billet réel : ni portails ou ponts, ni drapeau ou étoiles européennes, ni carte, ni mention « EURO/EYPΩ », ni sigles BCE, ni signature, ni numéro de série. Il n'imite non plus aucun élément de sécurité (bande holographique, filigrane, fil de sécurité).
- **La mention SPECIMEN** suit la règle de la BCE pour les reproductions numériques : en diagonale, Arial gras (Arimo, métriques identiques), opaque et contrastée, longueur 126 mm (79 % de la longueur, minimum 75 %), hauteur de capitale 13 mm (16 % de la hauteur, minimum 15 %).
- **Les mentions** « FAUX BILLET », « DOCUMENT PUBLICITAIRE SANS VALEUR MONÉTAIRE » et « BILLET FACTICE · AUCUNE VALEUR DE PAIEMENT » figurent sur le recto. Le verso est une publicité, sans rien qui ressemble à un billet.

**Attention.** Pour les reproductions imprimées, la seule règle « automatiquement licite » de la décision porte sur la **taille** : au moins 125 % ou au plus 75 % (recto seul), au moins 200 % ou au plus 50 % (recto verso). Un support **au format exact du billet (160 × 82 mm)** n'entre pas dans ces cas. Sa légalité repose donc sur l'absence de risque de confusion, ce que la conception vise. **Recommandation :** soumettre le PDF à la Banque nationale de Belgique avant le tirage pour obtenir une confirmation de conformité. La décision prévoit cette démarche. Si l'on veut éviter tout risque, on peut aussi passer au format 120 × 61,5 mm (75 %). Ce n'est pas un avis juridique.
