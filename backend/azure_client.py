from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://gestionprospect1234567-resource.services.ai.azure.com/api/projects/Gestionprospect1234567"
)

def send_to_agent(user_message: str, agent_id: str):
    # 1. Récupérer l'agent
    agent = project.agents.get_agent(agent_id)

    # 2. Créer un thread
    thread = project.agents.threads.create()

    # 3. Ajouter un message utilisateur
    project.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_message
    )

    # 4. Lancer le traitement par l'agent
    run = project.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent_id
    )

    # 5. Lire la réponse
    if run.status == "failed":
        return {"error": run.last_error}

    messages = project.agents.messages.list(thread_id=thread.id)

    output = []
    for msg in messages:
        if msg.text_messages:
            output.append({
                "role": msg.role,
                "content": msg.text_messages[-1].text.value
            })

    return output[-1] if output else {"message": "No response"}
