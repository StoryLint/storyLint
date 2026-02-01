from app.schemas.report import Question

def generate_questions():
    return [
        Question(
            key="actor",
            ask="Who is the actor?"
        ),
        Question(
            key="end_condition",
            ask="What ends this behavior?"
        )
    ]
