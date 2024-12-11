import logging

logger = logging.getLogger("YOUR_PROJECT_BE")
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()

# console_handler.setLevel(logging.INFO) # use this in production
console_handler.setLevel(logging.DEBUG) # use this in dev

console_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(console_formatter)
logger.addHandler(console_handler)
