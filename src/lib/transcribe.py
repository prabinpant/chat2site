import sys
import whisper
import warnings

# Suppress FP16 warning if no GPU is available
warnings.filterwarnings("ignore", message="FP16 is not supported on CPU; using FP32 instead")

def transcribe(file_path):
    try:
        # Load the base model (approx 150MB)
        model = whisper.load_model("base")
        
        # Transcribe the audio
        result = model.transcribe(file_path, language="en")
        
        # Print only the text output to stdout
        print(result["text"].strip())
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 transcribe.py <file_path>")
        sys.exit(1)
        
    transcribe(sys.argv[1])
