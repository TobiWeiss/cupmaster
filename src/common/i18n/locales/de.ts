export const de = {
  translation: {
    common: {
      create: 'Erstellen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
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
      fields: 'Spielfelder',
      minutes: 'Minuten',
      saveChanges: 'Änderungen speichern',
      games: 'Spiele',
      points: 'Punkte',
    },
    tournament: {
      name: 'Turniername',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      format: 'Turnierformat',
      formats: {
        league: 'Liga (Alle Teilnehmer in einer Gruppe)',
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
        matchesAgainstEach: 'Spiele gegen jeden Teilnehmer',
        pointsForWin: 'Punkte für Sieg',
        pointsForDraw: 'Punkte für Unentschieden',
        tiebreakers: 'Reihenfolge der Gleichstandsregeln',
        numberOfGroups: 'Anzahl der Gruppen',
        participantsPerGroup: 'Teilnehmer pro Gruppe',
        participantsQualifying: 'Qualifizierte Teilnehmer pro Gruppe',
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
        subtitle: 'Erstelle und verwalte deine Turniere',
        createTournament: {
          title: 'Leeres Turnier erstellen',
          description: 'Erstelle ein neues Turnier. Dabei kannst du alle Einstellungen für das Turnier selbstständig vornehmen.',
        },
        createTournamentWithWizard: {
          title: 'Turnier mit Assistenten erstellen',
          description: 'Erstelle ein neues Turnier mit Hilfe des Assistenten. Der Assistent sammelt alle wichtigen Informationen für das Turnier und erleichtert dir den Start.',
        },
        editTournament: {
          title: 'Turnier bearbeiten',
          description: 'Verwalte deine bestehenden Turniere',
          noTournaments: 'Keine Turniere verfügbar',
        },
        tournamentList: {
          title: 'Deine Turniere',
          status: {
            INITIALIZED: 'Initialisiert',
            READY: 'Bereit',
            IN_PROGRESS: 'Wird Durchgeführt',
            COMPLETED: 'Abgeschlossen',
          },
          format: {
            LEAGUE: 'Liga',
            GROUP_KNOCKOUT: 'Gruppenphase & K.O.-System',
            KNOCKOUT: 'K.O.-System',
          },
          iconLabels: {
            format: 'Format',
            beginning: 'Beginn',
            participants: 'Teilnehmer',
            status: 'Status',
            createdAt: 'Erstellt am',
          },
          deleteConfirmation: 'Möchten Sie dieses Turnier wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
          deleteSuccess: 'Turnier wurde erfolgreich gelöscht.',
          deleteError: 'Fehler beim Löschen des Turniers.'
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
        participants: {
          title: 'Teilnehmer',
          numberOfParticipants: 'Anzahl der Teilnehmer',
          participants: 'Teilnehmer',
          participant: 'Teilnehmer',
          logoUrl: 'Logo',
          name: 'Name',
          noParticipantsAdded: 'Keine Teilnehmer hinzugefügt',
          namePlaceholder: 'Name des Teilnehmers'
        },
        matches: {
          matchesAgainstEachParticipant: 'Spiele gegen jeden Teilnehmer',
          matchDuration: 'Spieldauer (Minuten)'
        },
        group: {
          title: 'Gruppenphase-Konfiguration',
          numberOfGroups: 'Anzahl der Gruppen',
          matchesAgainstEachParticipant: 'Spiele gegen jeden Teilnehmer in der Gruppe',
          participantsQualifying: 'Qualifizierte Teilnehmer pro Gruppe',
          matchDuration: 'Spieldauer Gruppenspiele (Minuten)',
          matchBreak: 'Pause zwischen Gruppenspielen (Minuten)'
        },
        knockout: {
          title: 'K.O.-Runden Konfiguration',
          matchFormat: 'K.O.-Runden Format',
          formats: {
            singleMatch: 'Einzelspiel',
            homeAndAway: 'Hin- und Rückspiel'
          },
          matchDuration: 'Spieldauer K.O.-Spiele (Minuten)',
          matchBreak: 'Pause zwischen K.O.-Spielen (Minuten)',
          hasThirdPlace: 'Spiel um Platz 3 durchführen'
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
          numberOfParticipants: {
            question: 'Wie viele Teilnehmer nehmen am Turnier teil?',
            validation: 'Die Anzahl der Teilnehmer muss zwischen 2 und 64 liegen'
          },
          participants: {
            question: 'Welche Teilnehmer nehmen am Turnier teil?',
            validation: 'Jeder Teilnehmer muss einen Namen haben.'
          },
          matchesAgainstEachParticipantLeague: {
            question: 'Wie oft spielt jeder Teilnehmer gegen jeden anderen Teilnehmer?',
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
            question: 'In wie viele Gruppen sollen die Teilnehmer aufgeteilt werden?',
            validation: 'Die Anzahl der Gruppen muss zwischen 2 und 8 liegen'
          },
          participantsQualifying: {
            question: 'Wie viele Teilnehmer qualifizieren sich pro Gruppe?',
            validation: 'Die Anzahl der qualifizierten Teilnehmer muss kleiner als die Anzahl der Teilnehmer pro Gruppe sein'
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
          participants: 'Teilnehmer',
          mode: 'Turnierformat',
          rules: 'Regeln'
        }
      },
    },
    tournamentOperation: {
      navigation: {
        gamePlan: 'Spielplan',
        participants: 'Teilnehmer',
        settings: 'Einstellungen'
      },
      gamePlan: {
        title: 'Spielplan Übersicht',
        description: 'Hier kannst du den Spielplan deines Turniers ansehen.',
        currentAndUpcoming: 'Aktuelle und anstehende Spiele',
        noMatches: 'Keine Spiele geplant',
        field: 'Spielfeld',
        allMatches: 'Alle Spiele',
        hideAllMatches: 'Alle Spiele ausblenden',
        showAllMatches: 'Alle Spiele anzeigen'
      },
      participants: {
        title: 'Teilnehmerverwaltung',
        description: 'Hier kannst du die Teilnehmer deines Turniers verwalten.',
        addParticipant: 'Teilnehmer hinzufügen',
        editParticipant: 'Teilnehmer bearbeiten',
        noParticipants: 'Keine Teilnehmer vorhanden',
        form: {
          name: 'Name',
          contact: 'Kontakt',
          logo: 'Logo',
          uploadLogo: 'Logo hochladen'
        }
      },
      settings: {
        title: 'Turniereinstellungen',
        description: 'Hier kannst du die Einstellungen deines Turniers bearbeiten. Klicke auf die gewünschte Einstellung um sie zu bearbieten.',
        addField: 'Spielfeld hinzufügen',
        notification: {
          success: 'Einstellung gespeichert, der Spielplan wurde automatisch aktualisiert. Die Reihenfolge der Spiele wurde beibehalten',
          warning: 'Das Ändern dieser Einstellung führt dazu, dass der Spielplan neu berechnet und die Match-Reihenfolge geändert wird. Sind sie sicher?',
          error: 'Einstellung konnte nicht gespeichert werden.'
        },
        categories: {
          basic: {
            title: 'Grundlegende Informationen',
            tournamentName: 'Turniername',
            format: 'Format',
            formats: {
              league: 'Liga',
              groupKnockout: 'Gruppenphase & K.O.-System',
              knockout: 'K.O.-System'
            },
            numberOfFields: 'Spielfelder'
          },
          dates: {
            title: 'Turnierzeiten',
            startDate: 'Startzeitpunkt',
            endDate: 'Endzeitpunkt',
            singleDay: 'Eintägig'
          },
          format: {
            title: 'Turnierformat',
            matchesAgainstEachParticipant: 'Spiele gegen jeden Teilnehmer',
            matchDuration: 'Spieldauer',
            matchBreakDuration: 'Pausendauer',
            pointsForWin: 'Punkte für Sieg',
            pointsForDraw: 'Punkte für Unentschieden',
            tiebreakers: 'Punktgleicheit'
          }
        },
        tiebreakers: {
          current: 'Aktuelle Regeln bei Punktgleicheit',
          available: 'Verfügbare Regeln',
          none: 'Keine Gleichstandsregeln festgelegt',
          GOAL_DIFFERENCE: 'Tordifferenz',
          HEAD_TO_HEAD: 'Direkter Vergleich',
          GOALS_SCORED: 'Erzielte Tore',
        }
      },
      loading: 'Turnier wird geladen...'
    }
  },
};
