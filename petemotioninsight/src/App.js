import React, { useState, useRef } from 'react';
import './App.css';

// Color variables according to the provided palette
const COLORS = {
  primary: '#6EC6CA',
  secondary: '#F9E79F',
  accent: '#F1948A',
  bg: '#FDFDFD',
  chatBg: '#F8FBFB',
  chatBubbleOwner: '#6EC6CA21',
  chatBubbleAI: '#F1948A19',
  border: '#E0E0E0',
  // fallback (optional)
  text: '#283747',
  textSecondary: '#8A8885'
};

function PetEmotionInsight() {
  const [chat, setChat] = useState([
    {
      from: 'ai',
      text: "👋 Hi there! Upload a pet photo or a sound clip, and I'll help you interpret your pet's emotions!"
    }
  ]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef();

  // PUBLIC_INTERFACE
  /** Handles pet image upload and triggers "fake" pose/emotion analysis */
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingImage(true);
    const imageObjectUrl = URL.createObjectURL(file);
    setImageUrl(imageObjectUrl);

    // Simulate image upload and pose detection
    setChat(current => [
      ...current,
      { from: 'owner', text: '📸 Uploaded pet image.' },
      { from: 'ai', text: 'Analyzing your pet’s posture...' }
    ]);
    setTimeout(() => {
      // Example: Simulated pose detection result
      const fakePose = fakePetPoseResult();
      setChat(current => [
        ...current,
        {
          from: 'ai',
          text: toFriendlyPoseInsight(fakePose)
        }
      ]);
      setLoadingImage(false);
    }, 1500);
  };

  // PUBLIC_INTERFACE
  /** Handles pet audio upload and triggers "fake" sound analysis */
  const handleAudioUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingAudio(true);
    const audioObjectUrl = URL.createObjectURL(file);
    setAudioUrl(audioObjectUrl);

    setChat(current => [
      ...current,
      { from: 'owner', text: '🎤 Uploaded pet sound.' },
      { from: 'ai', text: 'Listening to your pet\'s audio...' }
    ]);
    setTimeout(() => {
      // Example: Simulated sound classifier result
      const fakeSound = fakePetSoundResult();
      setChat(current => [
        ...current,
        {
          from: 'ai',
          text: toFriendlySoundInsight(fakeSound)
        }
      ]);
      setLoadingAudio(false);
    }, 1400);
  };

  // PUBLIC_INTERFACE
  /** Simulates pose detection result */
  function fakePetPoseResult() {
    const poses = [
      { type: 'lying', mood: 'relaxed', tip: 'Continue giving them love and comfort.' },
      { type: 'tail wag', mood: 'excited', tip: 'Engage in playtime together.' },
      { type: 'crouched', mood: 'anxious', tip: 'Create a calm, safe space for them.' },
      { type: 'stretched', mood: 'playful', tip: 'It\'s playtime! Grab a toy.' },
      { type: 'curled', mood: 'content', tip: 'A cuddle session could be appreciated.' },
      { type: 'arched', mood: 'alert', tip: 'Check for any changes in the environment.' }
    ];
    return poses[Math.floor(Math.random() * poses.length)];
  }

  // PUBLIC_INTERFACE
  /** Simulates sound classifier result */
  function fakePetSoundResult() {
    const sounds = [
      { type: 'soft meow', mood: 'content', tip: "Gently pet your cat or talk softly to them." },
      { type: 'happy bark', mood: 'joyful', tip: "Keep up the fun! Maybe a treat or game?" },
      { type: 'growl', mood: 'defensive', tip: "Give your pet some space and avoid sudden moves." },
      { type: 'whine', mood: 'restless', tip: "Check if your pet needs to go outside or wants attention." },
      { type: 'purr', mood: 'relaxed', tip: "Your cat feels safe. Nice work!" },
      { type: 'howl', mood: 'lonely', tip: "Spend some quality time with your buddy." }
    ];
    return sounds[Math.floor(Math.random() * sounds.length)];
  }

  // PUBLIC_INTERFACE
  /** Generates friendly pose chat insight */
  function toFriendlyPoseInsight(poseResult) {
    return (
      `🐾 Your pet's posture seems "${poseResult.type}" – they're showing signs of being ${poseResult.mood}. ` +
      `Tip: ${poseResult.tip}`
    );
  }

  // PUBLIC_INTERFACE
  /** Generates friendly sound chat insight */
  function toFriendlySoundInsight(soundResult) {
    return (
      `🎶 The sound uploaded indicates your pet is "${soundResult.type}" and may be ${soundResult.mood}. ` +
      `Tip: ${soundResult.tip}`
    );
  }

  // PUBLIC_INTERFACE
  /** Renders chat message bubbles in conversational style */
  function ChatBubble({ msg }) {
    const isOwner = msg.from === 'owner';
    return (
      <div
        style={{
          alignSelf: isOwner ? 'flex-end' : 'flex-start',
          background: isOwner ? COLORS.primary : COLORS.accent,
          color: isOwner ? COLORS.text : COLORS.text,
          backgroundColor: isOwner ? COLORS.chatBubbleOwner : COLORS.chatBubbleAI,
          borderRadius: isOwner
            ? '16px 16px 4px 16px'
            : '16px 16px 16px 4px',
          padding: '12px 18px',
          margin: '6px 0',
          maxWidth: '89%',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          border: `1px solid ${COLORS.border}`
        }}
      >
        <span style={{ fontSize: '1.02rem', lineHeight: 1.5 }}>{msg.text}</span>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  /** Clears the uploaded pet image and resets state */
  const handleClearImage = () => {
    setImageUrl(null);
  };

  // PUBLIC_INTERFACE
  /** Clears the uploaded pet audio and resets state */
  const handleClearAudio = () => {
    setAudioUrl(null);
    if (audioRef.current) {
      audioRef.current.value = "";
    }
  };

  // PUBLIC_INTERFACE
  /** Scroll chat view to latest entry */
  const chatEndRef = useRef();
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  // UI Main Layout
  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text }}>
      {/* Header/Navbar */}
      <nav
        style={{
          background: COLORS.primary,
          padding: 0,
          borderBottom: `3px solid ${COLORS.secondary}`,
          position: 'fixed',
          top: 0, left: 0,
          width: '100%',
          zIndex: 1000,
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 72 }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: COLORS.accent,
            letterSpacing: '0.01em',
            fontFamily: 'Inter,sans-serif',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '2.25rem',
              marginRight: 12,
              lineHeight: 1
            }}>🐶</span>
            PetEmotionInsight
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: "1.14rem", color: COLORS.textSecondary }}>
            by KAVIA
          </div>
        </div>
      </nav>
      <div style={{ height: 80 }} /> {/* spacer for navbar */}

      {/* Hero and Main Content */}
      <main className="container" style={{ minHeight: 600, paddingBottom: 48 }}>
        <section
          style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: 40,
            marginTop: 0
          }}
        >
          <h1 style={{
            margin: '0 0 8px 0',
            fontWeight: 700,
            fontSize: '2.8rem',
            color: COLORS.primary,
            fontFamily: 'Inter,sans-serif'
          }}>
            Understand Your Pet’s Emotions!
          </h1>
          <div style={{
            margin: '0 auto 14px auto',
            maxWidth: 440,
            color: COLORS.textSecondary,
            fontSize: '1.12rem'
          }}>
            AI-powered insights: Upload a pet image or sound to discover their emotional world. Get helpful tips and friendly interpretations!
          </div>
        </section>

        {/* Upload Section */}
        <div style={{
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24
        }}>
          {/* Image Upload */}
          <div style={{
            background: COLORS.secondary,
            borderRadius: 18,
            boxShadow: '0 3px 10px 0 rgba(110,198,202,0.07)',
            padding: 22,
            minWidth: 260,
            flex: 1,
            maxWidth: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 600, fontSize: '1.13rem', marginBottom: 7, color: COLORS.primary }}>
              Image Upload & Pose Detection
            </div>
            <label htmlFor="image-upload" style={{
              cursor: 'pointer',
              background: COLORS.primary,
              color: COLORS.bg,
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 500,
              marginBottom: 8,
              fontSize: '1.07rem',
              boxShadow: '0 1.5px 5px #6ec6ca09',
              transition: 'background 0.19s'
            }}>
              {loadingImage ? "Analyzing..." : "Upload Pet Image"}
              <input
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                accept="image/*"
                disabled={loadingImage}
                onChange={handleImageUpload}
              />
            </label>
            {imageUrl && (
              <div style={{ marginTop: 6, marginBottom: 8, width: '100%' }}>
                <img
                  src={imageUrl}
                  alt="Pet preview"
                  style={{
                    maxWidth: 128,
                    maxHeight: 96,
                    borderRadius: 10,
                    marginBottom: 5,
                    border: `2px solid ${COLORS.primary}`,
                    background: COLORS.bg,
                    objectFit: 'cover'
                  }}
                />
                <br />
                <button
                  onClick={handleClearImage}
                  style={{
                    background: COLORS.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: '2px 12px',
                    cursor: "pointer",
                    marginTop: 2
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <div
              style={{
                marginTop: 4,
                color: COLORS.textSecondary,
                fontSize: '0.98rem'
              }}>Supported: jpg, png, gif</div>
          </div>

          {/* Audio Upload */}
          <div style={{
            background: COLORS.secondary,
            borderRadius: 18,
            boxShadow: '0 3px 10px 0 rgba(241,148,138,0.07)',
            padding: 22,
            minWidth: 260,
            flex: 1,
            maxWidth: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{ fontWeight: 600, fontSize: '1.13rem', marginBottom: 7, color: COLORS.accent }}>
              Audio Upload & Sound Analysis
            </div>
            <label htmlFor="audio-upload" style={{
              cursor: 'pointer',
              background: COLORS.accent,
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 500,
              marginBottom: 8,
              fontSize: '1.07rem',
              boxShadow: '0 1.5px 5px #f1948a09',
              transition: 'background 0.19s'
            }}>
              {loadingAudio ? "Analyzing..." : "Upload Pet Sound"}
              <input
                style={{ display: 'none' }}
                id="audio-upload"
                type="file"
                accept="audio/*"
                disabled={loadingAudio}
                ref={audioRef}
                onChange={handleAudioUpload}
              />
            </label>
            {audioUrl && (
              <div style={{ marginTop: 6, marginBottom: 8, width: '100%' }}>
                <audio
                  src={audioUrl}
                  controls
                  style={{ width: "100%", borderRadius: 8, background: COLORS.bg }}
                >
                  Your browser does not support the audio element.
                </audio>
                <br />
                <button
                  onClick={handleClearAudio}
                  style={{
                    background: COLORS.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: '2px 12px',
                    cursor: "pointer",
                    marginTop: 2
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <div
              style={{
                marginTop: 4,
                color: COLORS.textSecondary,
                fontSize: '0.98rem'
              }}>Supported: wav, mp3, m4a</div>
          </div>
        </div>

        {/* Chat/Insight Section */}
        <section
          style={{
            margin: '0 auto',
            marginTop: 6,
            background: COLORS.chatBg,
            borderRadius: 22,
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: '0 2px 10px 0 rgba(110,198,202,0.04)',
            maxWidth: 600,
            minHeight: 180,
            padding: '26px 18px 20px 18px',
            display: "flex",
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              fontSize: '1.06rem',
              marginBottom: 11,
              color: COLORS.primary,
              fontWeight: 600,
              letterSpacing: '0.01em'
            }}
          >
            Pet Emotion Chat
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              minHeight: 115,
              maxHeight: 260,
              overflowY: 'auto',
              paddingRight: 2,
              marginBottom: 2,
              transition: 'all 0.20s'
            }}
          >
            {chat.map((msg, idx) => (
              <ChatBubble key={idx} msg={msg} />
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, paddingTop: 6 }}>
            Insights generated for demo purposes. In production, these would come from real AI analysis.
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '22px 0 13px 0',
        color: COLORS.textSecondary,
        background: COLORS.bg,
        fontSize: '1.01rem'
      }}>
        © {new Date().getFullYear()} PetEmotionInsight &nbsp;|&nbsp; Made with love for pet owners 🐾
      </footer>
    </div>
  );
}

export default PetEmotionInsight;
