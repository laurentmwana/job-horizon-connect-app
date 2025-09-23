<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des candidats - Job Horizon</title>
    <style>
        /* Styles généraux */
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            color: #333;
            margin: 0;
            padding: 20px 40px;
            line-height: 1.4;
        }
        
        /* En-tête */
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2ecc71;
            padding-bottom: 20px;
        }
        
        .logo {
            width: 100px;
            margin-bottom: 15px;
        }
        
        .title {
            margin: 10px 0;
            color: #2c3e50;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: bold;
        }
        
        .company-info {
            font-size: 11px;
            color: #555;
            margin-top: 8px;
            line-height: 1.5;
        }
        
        .company-name {
            color: #2ecc71;
            font-weight: bold;
            font-size: 12px;
        }
        
        .document-info {
            font-size: 10px;
            color: #777;
            margin-top: 10px;
            font-style: italic;
        }
        
        /* Détails de l'offre */
        .offer-section {
            margin-bottom: 25px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #2ecc71;
        }
        
        .offer-title {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: #2c3e50;
            font-weight: bold;
        }
        
        .offer-details {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .offer-detail {
            margin: 5px 0;
        }
        
        /* Tableau des candidats */
        .candidates-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            font-size: 11px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .candidates-table th {
            background-color: #2ecc71;
            color: #fff;
            font-weight: bold;
            padding: 12px 10px;
            border: 1px solid #ddd;
            text-align: left;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 10.5px;
        }
        
        .candidates-table td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        
        .candidates-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .candidates-table tbody tr:hover {
            background-color: #f0f7f4;
        }
        
        /* Pied de page */
        .footer {
            margin-top: 50px;
            font-size: 9px;
            text-align: center;
            color: #888;
            border-top: 1px solid #ddd;
            padding-top: 12px;
            font-style: italic;
        }
        
        /* Responsive pour impression */
        @media print {
            body {
                padding: 0;
                margin: 0;
            }
            
            .header {
                border-bottom: 2px solid #2ecc71;
            }
            
            .candidates-table {
                box-shadow: none;
            }
            
            .candidates-table tbody tr:hover {
                background-color: inherit;
            }
        }
    </style>
</head>
<body>

    <!-- EN-TÊTE -->
    <div class="header">
        <img src="{{ public_path('images/logo.svg') }}" alt="Logo Job Horizon" class="logo">
        <h1 class="title">Liste des candidats</h1>
        <div class="company-info">
            <span class="company-name">Entreprise Job Horizon</span><br>
            374 Colonel Mondjiba, Galerie St Pierre, Local 18<br>
            Référence : Alimentation S & K<br>
            123 Avenue des Talents, Kinshasa, RDC<br>
            contact@job-horizon.com | +243 818 043 802
        </div>
        <p class="document-info">
            Document généré le {{ \Carbon\Carbon::now()->format('d/m/Y à H:i') }}
        </p>
    </div>

    <!-- DÉTAILS DE L'OFFRE -->
    <div class="offer-section">
        <h2 class="offer-title">Offre : {{ $offer->name }}</h2>
        <div class="offer-details">
            <p class="offer-detail"><strong>Date de début :</strong> {{ $offer->start_at }}</p>
            <p class="offer-detail"><strong>Date de fin :</strong> {{ $offer->end_at }}</p>
            <p class="offer-detail"><strong>Nombre de candidats :</strong> {{ count($candidates) }}</p>
        </div>
    </div>

    <!-- TABLEAU DES CANDIDATS -->
    <table class="candidates-table">
        <thead>
            <tr>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Genre</th>
                <th>Date de candidature</th>
            </tr>
        </thead>
        <tbody>
            @foreach($candidates as $candidate)
                <tr>
                    <td>{{ $candidate->name }}</td>
                    <td>{{ $candidate->user->email }}</td>
                    <td>{{ $candidate->phone }}</td>
                    <td>{{ $candidate->gender }}</td>
                    <td>{{ $candidate->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- PIED DE PAGE -->
    <div class="footer">
        Ce document est généré automatiquement par le système d'administration de <strong>Job Horizon</strong>.
        Il est confidentiel et destiné à un usage interne uniquement.
    </div>

</body>
</html>