from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    text: str
    gwt_required: bool = False
