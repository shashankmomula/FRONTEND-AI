// Supported programming languages
export const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },

];

// Default code templates for each language
export const DEFAULT_CODE = {
  javascript: '// Write your JavaScript code here...',
  python: '# Write your Python code here...',
  java: '// Write your Java code here...',
  cpp: '// Write your C++ code here...',

};

// Common imports for each language
export const COMMON_IMPORTS = {
  javascript: `// Common JavaScript libraries
import React from 'react';
import axios from 'axios';
import lodash from 'lodash';
import moment from 'moment';

// Your code here...`,
  python: `# Common Python libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import requests
from datetime import datetime

# Your code here...`,
  java: `// Common Java imports
import java.util.*;
import java.io.*;
import java.net.*;
import java.time.*;

// Your code here...`,
  cpp: `// Common C++ includes
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>`,
};

// Editor configuration options
export const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 15,
  lineNumbers: 'on',
  roundedSelection: true,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  fontFamily: 'Fira Mono, monospace',
}; 