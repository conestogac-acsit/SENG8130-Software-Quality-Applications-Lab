describe('getInstructorSubmissionStatus', () => {
  it('should return "Not Started" when no evaluations exist', () => {
    const result = getInstructorSubmissionStatus([], ['alice@uni.edu']);
    expect(result['alice@uni.edu']).toBe('Not Started');
  });

  it('should return "Submitted" when evaluations are complete and valid', () => {
    const evaluations: Evaluation[] = [
      { ...validEvaluation, instructor: 'alice@uni.edu' }
    ];
    const result = getInstructorSubmissionStatus(evaluations, ['alice@uni.edu']);
    expect(result['alice@uni.edu']).toBe('Submitted');
  });

  it('should return "Incomplete" when evaluation is missing required fields', () => {
    const incompleteEval: Evaluation = {
      ...validEvaluation,
      course: '',
      instructor: 'bob@uni.edu'
    };
    const result = getInstructorSubmissionStatus([incompleteEval], ['bob@uni.edu']);
    expect(result['bob@uni.edu']).toBe('Incomplete');
  });

  it('should return "Needs Fixing" when evaluation has invalid weight', () => {
    const invalidEval: Evaluation = {
      ...validEvaluation,
      weight: 150,
      instructor: 'carol@uni.edu'
    };
    const result = getInstructorSubmissionStatus([invalidEval], ['carol@uni.edu']);
    expect(result['carol@uni.edu']).toBe('Needs Fixing');
  });

  it('should return "Needs Fixing" for invalid due date', () => {
    const invalidDateEval: Evaluation = {
      ...validEvaluation,
      dueDate: new Date('invalid'), 
      instructor: 'dan@uni.edu'
    };
    const result = getInstructorSubmissionStatus([invalidDateEval], ['dan@uni.edu']);
    expect(result['dan@uni.edu']).toBe('Needs Fixing');
  });

  

  it('should handle multiple instructors correctly', () => {
    const evaluations: Evaluation[] = [
      { ...validEvaluation, instructor: 'a@uni.edu' },
      { ...validEvaluation, instructor: 'b@uni.edu', weight: 200 }, 
      { ...validEvaluation, instructor: 'c@uni.edu', course: '' }, 
    ];

    const result = getInstructorSubmissionStatus(evaluations, [
      'a@uni.edu',
      'b@uni.edu',
      'c@uni.edu',
      'd@uni.edu'
    ]);
