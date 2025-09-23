<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des participants - Job Horizon</title>
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
            border-bottom: 2px solid #008235;
            padding-bottom: 20px;
        }
        
        .logo {
            width: 150px;
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
            color: #008235;
            font-weight: bold;
            font-size: 12px;
        }
        
        .document-info {
            font-size: 10px;
            color: #777;
            margin-top: 10px;
            font-style: italic;
        }
        
        /* Détails de l'activité */
        .activity-section {
            margin-bottom: 25px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #008235;
        }
        
        .activity-title {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: #2c3e50;
            font-weight: bold;
        }
        
        .activity-details {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .activity-detail {
            margin: 5px 0;
        }
        
        /* Tableau des participants */
        .participants-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            font-size: 11px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .participants-table th {
            background-color: #008235;
            color: #fff;
            font-weight: bold;
            padding: 12px 10px;
            border: 1px solid #ddd;
            text-align: left;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 10.5px;
        }
        
        .participants-table td {
            padding: 10px;
            border: 1px solid #ddd;
        }
        
        .participants-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .participants-table tbody tr:hover {
            background-color: #f0f7f4;
        }
        
        /* Statistiques */
        .stats-section {
            margin-top: 20px;
            padding: 10px;
            background-color: #f0f7f4;
            border-radius: 4px;
            font-size: 11px;
        }
        
        .stats-title {
            font-weight: bold;
            margin-bottom: 5px;
            color: #2c3e50;
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
                border-bottom: 2px solid #008235;
            }
            
            .participants-table {
                box-shadow: none;
            }
            
            .participants-table tbody tr:hover {
                background-color: inherit;
            }
        }
    </style>
</head>
<body>

    <!-- EN-TÊTE -->
    <div class="header">
        <img src="{{ public_path('logo.svg') }}" alt="Logo Job Horizon" class="logo">
        <h1 class="title">Liste des participants</h1>
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

    <!-- DÉTAILS DE L'ACTIVITÉ -->
    <div class="activity-section">
        <h2 class="activity-title">Activité : {{ $activity->title }}</h2>
        <div class="activity-details">
            <p class="activity-detail"><strong>Date de début :</strong> {{ $activity->start_at->format('d/m/Y') }}</p>
            <p class="activity-detail"><strong>Date de fin :</strong> {{ $activity->end_at->format('d/m/Y') }}</p>
            <p class="activity-detail"><strong>Description :</strong> {{ $activity->description ?? 'Non spécifiée' }}</p>
        </div>
    </div>

    <!-- TABLEAU DES PARTICIPANTS -->
    <table class="participants-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Genre</th>
                <th>Date d'inscription</th>
            </tr>
        </thead>
        <tbody>
            @foreach($participants as $participant)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $participant->name }}</td>
                    <td>{{ $participant->user->email }}</td>
                    <td>{{ $participant->phone }}</td>
                    <td>{{ $participant->gender }}</td>
                    <td>{{ $participant->created_at->format('d/m/Y') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <!-- STATISTIQUES -->
    <div class="stats-section">
        <div class="stats-title">Résumé des participants</div>
        <p><strong>Nombre total de participants :</strong> {{ count($participants) }}</p>
        @php
            $maleCount = $participants->where('gender', 'Masculin')->count();
            $femaleCount = $participants->where('gender', 'Féminin')->count();
            $otherCount = count($participants) - $maleCount - $femaleCount;
        @endphp
        <p><strong>Répartition par genre :</strong> 
            Masculin: {{ $maleCount }}, 
            Féminin: {{ $femaleCount }}, 
            Autre: {{ $otherCount }}
        </p>
    </div>

    <!-- PIED DE PAGE -->
    <div class="footer">
        Ce document est généré automatiquement par le système d'administration de <strong>Job Horizon</strong>.
        Il est confidentiel et destiné à un usage interne uniquement.
    </div>

</body>
</html>