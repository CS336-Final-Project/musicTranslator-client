import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MusixMatchService } from '../../services/musixmatch/musixmatch.service';
import { GeniusService } from '../../services/genius/genius.service';
import { TranslateService } from '../../services/translate/translate.service';

// interface translationSong {
//   api_path: string;
//   id: number;
//   language: string;
//   lyrics_state: string;
//   path: string;
// }

@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HttpClientModule],
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css'],
})

export class ListenComponent implements OnInit {
  originalLyrics: string = 'Loading original subtitles...';
  translatedLyrics: string = 'Loading translated subtitles...';
  projectId: string = 'astral-net-444702-n3'
  isLoading: boolean = true;
  errorMessage: string = '';
  trackName: string = 'Loading track name...';
  trackArtist: string = 'Loading track artist...';

  trackID: string = '';

  //Spotify Variables
  songtrackID: number = 0;

  //Genius Variables
  // originalLyricsURL: string = '';
  // originalLyricsURLID: number = 0;
  // translatedLyricsURL: string[] = [];
  // error: string = '';

  constructor(
    private musixmatchService: MusixMatchService,
    private geniusService: GeniusService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //spotify service

    // Getting song info
    this.route.paramMap.subscribe(params => {
      this.trackID = params.get('trackID') || '';
      console.log("Track ID from artist card:", this.trackID);
    })

    //MusixMatch Service
    // const commontrackID = 287164945;
    // const selectedLanguage = 'it';
    this.fetchLyrics(this.trackID);
    this.fetchTrackDetails(this.trackID);
    // this.fetchTranslatedLyrics(commontrackID, selectedLanguage);


    // const songID = 378195;
    // this.fetchSongDetails(songID);
    // const query = 'Peso Pluma'
    // this.fetchSearchResults(query);
  }

  fetchLyrics(track_isrc: string): void {
    this.isLoading = true;
    console.log('Fetching lyrics with:', { track_isrc });
    this.musixmatchService.getOriginalLyrics(track_isrc).subscribe({
      next: (response) => {
        console.log('Lyrics API Response:', response);
        const lyrics = response?.message?.body?.lyrics;
        if (lyrics) {
          this.originalLyrics = `${lyrics.lyrics_body}`;
        } else {
          this.originalLyrics = 'Search for a song to play';
        }
        this.isLoading = false;
        console.log(this.originalLyrics);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred';
        console.error('Error fetching lyrics:', err);
        this.isLoading = false;
      }
    });
  }

  // DO NOT HAVE ACCESS TO THIS SERVICE
  fetchTranslatedLyrics(commontrackID: number, selectedLanguage: string): void {
    this.isLoading = true;
    console.log('Fetching lyrics with:', { commontrackID, selectedLanguage });
    this.musixmatchService.getTranslatedLyrics(commontrackID, selectedLanguage).subscribe({
      next: (response) => {
        console.log('Translated Lyrics API Response:', response);
        const lyrics = response?.message?.body?.lyrics;
        if (lyrics) {
          this.translatedLyrics = `Translated Lyrics: ${lyrics.lyrics_body}`;
        } else {
          this.translatedLyrics = 'No lyrics found';
        }
        this.isLoading = false;
        console.log(this.translatedLyrics);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred';
        console.error('Error fetching lyrics:', err);
        this.isLoading = false;
      }
    });
  }
  

  fetchTrackDetails(track_isrc: string): void {
    this.musixmatchService.getTrack(track_isrc).subscribe({
      next: (response) => {
        const track = response.message.body.track;
        if (track) {
          this.trackName = `${track.track_name}`;
          this.trackArtist = `${track.artist_name}`;
        } else {
          this.trackName = 'No track name available';
          this.trackArtist = 'No track arist available';
        }
        // console.log('Track Details:', this.trackDetails);
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while fetching track details';
        console.error('Error fetching track details:', err);
      }
    });
  }
}


 // fetchSearchResults(query: string): void {
  //   this.isLoading = true;
  //   this.geniusService.getSearchResults(query).subscribe({
  //     next: (response) => {
  //       const searchResults = response?.response?.hits;
  //       if (searchResults) {
  //         this.trackDetails = `Track Details(Genius Search): ${searchResults[0].result.title}`;
  //       } else {
  //         this.trackDetails = 'No search results found';
  //       }
  //       this.isLoading = false;
  //       console.log(this.trackDetails);
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message || 'An error occurred';
  //       console.error('Error fetching search results:', err);
  //       this.isLoading = false;
  //     }
  //   })
  // }

  // fetchSongDetails(commonTrackID: number): void {
  //   this.geniusService.getSongDetails(commonTrackID).subscribe({
  //     next: (response) => {
  //       const songDetails = response?.response?.song;
  //       console.log("Genius API Response: ", response);
  
  //       if (songDetails) {
  //         // Set the original lyrics URL
  //         this.originalLyricsURL = songDetails.url || 'No lyrics URL found';

  //         const translationLength = songDetails.translation_songs.length;
  
  //         for (let i = 0; i < translationLength; i++) {
  //           this.translatedLyricsURL.push(songDetails.translation_songs[i]);
  //         }
  //         } else {
  //         this.originalLyricsURL = 'No lyrics URL found';
  //         this.translatedLyricsURL = [];
  //         console.log('No song details found.');
  //       }
  
  //       this.isLoading = false;
  //       console.log('Original Lyrics URL:', this.originalLyricsURL);
  //       console.log('Translated Lyrics URLs:', this.translatedLyricsURL[0]);

  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message || 'An error occurred';
  //       console.error('Error fetching song details:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }  