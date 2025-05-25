// Supported programming languages
export const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
];

// Default code templates for each language
export const DEFAULT_CODE = {
  javascript: '// Write your JavaScript code here...',
  python: '# Write your Python code here...',
  java: '// Write your Java code here...',
  cpp: '// Write your C++ code here...',
  csharp: '// Write your C# code here...',
  php: '<?php\n// Write your PHP code here...',
  ruby: '# Write your Ruby code here...',
  swift: '// Write your Swift code here...',
  go: '// Write your Go code here...',
  rust: '// Write your Rust code here...',
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
#include <map>

// Your code here...`,
  csharp: `// Common C# using statements
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Your code here...`,
  php: `<?php
// Common PHP includes
require_once 'vendor/autoload.php';
use GuzzleHttp\Client;
use Carbon\Carbon;

// Your code here...`,
  ruby: `# Common Ruby requires
require 'net/http'
require 'json'
require 'date'
require 'active_support/all'

# Your code here...`,
  swift: `// Common Swift imports
import Foundation
import UIKit
import SwiftUI
import Combine

// Your code here...`,
  go: `// Common Go imports
package main

import (
    "fmt"
    "net/http"
    "encoding/json"
    "time"
)

// Your code here...`,
  rust: `// Common Rust imports
use std::collections::HashMap;
use std::fs::File;
use std::io::{self, Write};
use serde::{Serialize, Deserialize};

// Your code here...`,
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