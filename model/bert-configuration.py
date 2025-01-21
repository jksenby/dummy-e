from flask import Flask, request, jsonify
from happytransformer import HappyTextToText, TTSettings
from transformers import PegasusTokenizer, PegasusForConditionalGeneration

app = Flask(__name__)

# Initialize the grammar correction model using happytransformer
happy_tt = HappyTextToText("T5", "vennify/t5-base-grammar-correction")

# Initialize settings for grammar correction
args = TTSettings(num_beams=5, min_length=1)

# Load pre-trained Pegasus Paraphrase model and tokenizer
tokenizer = PegasusTokenizer.from_pretrained("tuner007/pegasus_paraphrase")
model = PegasusForConditionalGeneration.from_pretrained("tuner007/pegasus_paraphrase")


# Function to enhance a prompt by focusing on grammar correction and paraphrasing for clarity and detail
def enhance_prompt(prompt, correct_grammar=True, paraphrase=True):
    """
    Corrects grammar, spelling, and paraphrases the given prompt to make it clearer, more detailed,
    and contextually appropriate.
    """
    if correct_grammar:
        # Step 1: Correct grammar and spelling (apply to entire text)
        grammar_instruction = f"grammar: {prompt}"
        corrected_output = happy_tt.generate_text(grammar_instruction, args=args)
        corrected_prompt = corrected_output.text
    else:
        corrected_prompt = prompt

    if paraphrase:
        # Step 2: Paraphrase the corrected text using Pegasus for a longer and more detailed version
        input_ids = tokenizer.encode(corrected_prompt, return_tensors='pt')

        # Generate detailed paraphrased sentence with longer output
        paraphrase_ids = model.generate(input_ids, num_beams=5, max_length=400, early_stopping=True)

        # Decode and get the paraphrased result
        paraphrased_text = tokenizer.decode(paraphrase_ids[0], skip_special_tokens=True)

        return paraphrased_text
    else:
        return corrected_prompt


# Define the API endpoint
@app.route('/sat-enhance', methods=['POST'])
def sat_enhance_prompt():
    # Get JSON data from the request
    data = request.get_json()

    # Extract the 'prompt' and options from the input
    prompt = data.get('prompt')
    correct_grammar = data.get('correct_grammar', True)
    paraphrase = data.get('paraphrase', True)

    # Ensure prompt is provided
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Enhance the prompt based on user options
    enhanced_prompt = enhance_prompt(prompt, correct_grammar, paraphrase)

    # Return the enhanced prompt as JSON
    return jsonify({"original_prompt": prompt, "enhanced_prompt": enhanced_prompt})


if __name__ == '__main__':
    app.run(debug=True)
