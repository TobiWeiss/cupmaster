export const de = {
  translation: {
    common: {
      create: 'Erstellen',
      edit: 'Bearbeiten',
      save: 'Speichern',
      cancel: 'Abbrechen',
      loading: 'Lädt...',
      error: 'Fehler',
      next: 'Weiter',
      back: 'Zurück',
      select: 'Bitte wählen',
      upload: 'Hochladen',
      uploadLogo: 'Logo hochladen',
      skip: 'Überspringen',
      yes: 'Ja',
      no: 'Nein',
      add: 'Hinzufügen',
      time: 'Uhrzeit',
      hour: 'Stunde',
    },
    tournament: {
      name: 'Turniername',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      format: 'Turnierformat',
      formats: {
        league: 'Liga (Alle Teams in einer Gruppe)',
        groupKnockout: 'Gruppenphase + K.O.-Runden',
        knockout: 'Nur K.O.-Runden',
      },
      status: {
        notStarted: 'Nicht gestartet',
        inProgress: 'In Bearbeitung',
        completed: 'Abgeschlossen',
      },
      config: {
        formatConfig: 'Formatkonfiguration',
        matchesAgainstEach: 'Spiele gegen jedes Team',
        pointsForWin: 'Punkte für Sieg',
        pointsForDraw: 'Punkte für Unentschieden',
        tiebreakers: 'Reihenfolge der Gleichstandsregeln',
        numberOfGroups: 'Anzahl der Gruppen',
        teamsPerGroup: 'Teams pro Gruppe',
        teamsQualifying: 'Qualifizierte Teams pro Gruppe',
        qualificationMode: 'Qualifikationsmodus',
        knockoutMatches: 'K.O.-Spiele',
        awayGoalsRule: 'Auswärtstorregel',
        extraTime: 'Verlängerung',
        penalties: 'Elfmeterschießen',
        thirdPlace: 'Spiel um Platz 3',
      },
    },
    general: {
      title: 'CupMaster',
    },
    tournamentInit: {
      home: {
        title: 'Turnier-Planer',
        subtitle: 'Erstellen und verwalten Sie Ihre Fußballturniere',
        createTournament: {
          title: 'Turnier erstellen',
          description: 'Starten Sie ein neues Turnier mit benutzerdefinierten Einstellungen',
        },
        editTournament: {
          title: 'Turnier bearbeiten',
          description: 'Verwalten Sie Ihre bestehenden Turniere',
          noTournaments: 'Keine Turniere verfügbar',
        },
        tournamentList: {
          title: 'Ihre Turniere',
        },
      },
      creation: {
        title: 'Turnier erstellen',
        description: 'Wir sammeln nun Informationen, die wir für das Erstellen deines Turnieres benötigen. Um das so angenehm und einfach wie möglich zu gestalten, stellen wir dier hierzu ein paar Fragen.'
         + ' Alle Antworten können später noch bearbeitet bzw. ergänzt werden.',
        step: 'Schritt',
        basicInformation: {
          title: 'Grundlegende Informationen',
          name: 'Turniername',
          logoUrl: 'Turnier-Logo',
          format: 'Turnierformat',
          formats: {
            league: 'Liga',
            groupKnockout: 'Gruppenphase & K.O.-System',
            knockout: 'K.O.-System'
          }
        },
        tournamentDates: {
          title: 'Turnierdaten',
          startDate: 'Startdatum',
          multipleDays: 'Mehrere Tage',
          endDate: 'Enddatum'
        },
        teams: {
          title: 'Teams',
          numberOfTeams: 'Anzahl der Teams',
          teams: 'Teams',
          team: 'Team',
          logoUrl: 'Logo',
          name: 'Name',
          noTeamsAdded: 'Keine Teams hinzugefügt',
          namePlaceholder: 'Name des Teams'
        },
        matches: {
          matchesAgainstEachTeam: 'Spiele gegen jedes Team',
          matchDuration: 'Spieldauer (Minuten)'
        },
        group: {
          title: 'Gruppenphase-Konfiguration',
          numberOfGroups: 'Anzahl der Gruppen',
          matchesAgainstEachTeam: 'Spiele gegen jedes Team in der Gruppe',
          teamsQualifying: 'Qualifizierte Teams pro Gruppe',
          matchDuration: 'Spieldauer Gruppenspiele (Minuten)',
          matchBreak: 'Pause zwischen Gruppenspielen (Minuten)'
        },
        knockout: {
          title: 'K.O.-Runden Konfiguration',
          format: 'K.O.-Runden Format',
          format: {
            singleMatch: 'Einzelspiel',
            homeAndAway: 'Hin- und Rückspiel'
          },
          matchDuration: 'Spieldauer K.O.-Spiele (Minuten)',
          matchBreak: 'Pause zwischen K.O.-Spielen (Minuten)',
          hasThirdPlace: 'Spiel um Platz 3 durchführen'
        },
        validation: {
          required: 'Pflichtfeld',
          minTeams: 'Mindestens {{min}} Teams erforderlich',
          maxTeams: 'Maximal {{max}} Teams erlaubt',
          minMatches: 'Mindestens {{min}} Spiel(e)',
          maxMatches: 'Maximal {{max}} Spiele',
          minDuration: 'Mindestens {{min}} Minuten',
          maxDuration: 'Maximal {{max}} Minuten',
          minMatchBreak: 'Mindestens {{min}} Minuten',
          maxMatchBreak: 'Maximal {{max}} Minuten'
        },
        questions: {
          name: {
            question: 'Wie ist der Name deines Turniers?',
            validation: 'Bitte gib einen Turniernamen ein',
            explanation: 'Der Turniername wird in allen Ansichten und Dokumenten verwendet. Wähle einen eindeutigen und aussagekräftigen Namen.'
          },
          logo: {
            question: 'Möchtest du ein Logo für dein Turnier hochladen?',
            validation: 'Das Logo muss ein Bild sein'
          },
          format: {
            question: 'Welches Format soll dein Turnier haben?',
            validation: 'Bitte wähle ein Turnierformat aus'
          },
          fields: {
            question: 'Wie viele Spielfelder sollen dein Turnier haben?',
            validation: 'Die Anzahl der Spielfelder muss zwischen 1 und 10 liegen'
          },
          startDate: {
            question: 'Wann beginnt das Turnier?',
            validation: 'Bitte wähle ein Startdatum sowie eine Startzeit aus'
          },
          multipleDays: {
            question: 'Soll das Turnier mehrere Tage dauern?',
            validation: 'Bitte wähle aus, ob das Turnier mehrere Tage dauern soll'
          },
          endDate: {
            question: 'Wann endet das Turnier?',
            validation: 'Das Enddatum muss nach dem Startdatum liegen'
          },
          startTime: {
            question: 'Um wie viel Uhr beginnt das Turnier?',
            validation: 'Bitte wähle ein Startzeit aus'
          },
          numberOfTeams: {
            question: 'Wie viele Teams nehmen am Turnier teil?',
            validation: 'Die Anzahl der Teams muss zwischen 2 und 64 liegen'
          },
          teams: {
            question: 'Welche Teams nehmen am Turnier teil?',
            validation: 'Jedes Team muss einen Namen haben.'
          },
          matchesAgainstEachTeamLeague: {
            question: 'Wie oft spielt jedes Team gegen jedes andere Team?',
            validation: 'Die Anzahl der Spiele muss zwischen 1 und 4 liegen'
          },
          matchDurationLeague: {
            question: 'Wie lange dauert ein Spiel?',
            validation: 'Die Spieldauer muss zwischen 10 und 120 Minuten liegen'
          },
          matchBreakLeague: {
            question: 'Wie lange dauert die Pause zwischen den Spielen?',
            validation: 'Die Pause muss zwischen 0 und 10 Minuten liegen'
          },
          matchDurationGroup: {
            question: 'Wie lange dauert ein Spiel?',
            validation: 'Die Spieldauer muss zwischen 10 und 120 Minuten liegen'
          },
          matchBreakGroup: {
            question: 'Wie lange dauert die Pause zwischen den Gruppenspielen?',
            validation: 'Die Pause muss zwischen 0 und 10 Minuten liegen'
          },
          numberOfGroups: {
            question: 'In wie viele Gruppen sollen die Teams aufgeteilt werden?',
            validation: 'Die Anzahl der Gruppen muss zwischen 2 und 8 liegen'
          },
          teamsQualifying: {
            question: 'Wie viele Teams qualifizieren sich pro Gruppe?',
            validation: 'Die Anzahl der qualifizierten Teams muss kleiner als die Anzahl der Teams pro Gruppe sein'
          },
          knockoutFormat: {
            question: 'Welches Format sollen die K.O.-Spiele haben?',
            validation: 'Bitte wähle ein Format für die K.O.-Runden'
          },
          matchDurationKnockout: {
            question: 'Wie lange dauert ein K.O.-Spiel?',
            validation: 'Die Spieldauer muss zwischen 5 und 120 Minuten liegen'
          },
          matchBreakKnockout: {
            question: 'Wie lange dauert die Pause zwischen den K.O.-Spielen?',
            validation: 'Die Pause muss zwischen 0 und 10 Minuten liegen'
          },
          hasThirdPlace: {
            question: 'Soll es ein Spiel um Platz 3 geben?',
            validation: 'Bitte wähle aus, ob es ein Spiel um Platz 3 geben soll'
          }
        },
        categories: {
          basicInformation: 'Grundlegendes',
          tournamentDates: 'Zeiten',
          teams: 'Teams',
          mode: 'Turnierformat',
          rules: 'Regeln'
        }
      },
    },
  },
};
